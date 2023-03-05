import { shell } from "electron";
import { spawn } from "child_process";

import Card, { CardConfig } from "./Card";
import Separator from "./Separator";

window.onload = function () {
  const config = "./config.json";
  const fs = require("fs");
  const json = JSON.parse(fs.readFileSync(config));

  const cardsContainer = document.getElementById("cards");

  json?.objects?.forEach((card: CardConfig) => {
    if (card.separator) {
      const separator = new Separator(card.title);
      cardsContainer.appendChild(separator.getElement());
      return;
    }

    const newCard = new Card(card);
    cardsContainer.appendChild(newCard.getElement());
    newCard.onClickAction = (data: CardConfig) => {
      resetClasses(data);
      data.script != "" && execute(data, "sh", [data.script]);
      data.command != "" && execute(data, "cmd", ["/c", data.command]);
      data.folder != "" && openFolder(data);
      data.url != "" && openUrl(data);
    };
  });
};

function openUrl(data: CardConfig) {
  shell.openExternal(data.url);
  hideError(data);
}

function openFolder(data: CardConfig) {
  spawn(`cmd`, ["/c", data.folder]);
}

function execute(data: CardConfig, cmd: string, params: string[]) {
  const start = new Date().getTime();
  toggleButtonState(data, false);
  createShellListeners(start, data, cmd, params);
}

function toggleButtonState(data: CardConfig, active: boolean) {
  data.buttonObject.disabled = !active;
}

function createShellListeners(
  start: number,
  data: CardConfig,
  cmd: string,
  params: string[]
) {
  const shell = spawn(cmd, [...params]);
  shell.removeAllListeners();
  shell.on("spawn", () => flashClass(data, ["__card-started"]));
  shell.on("close", (code = 0) => {
    showElapsedTime(start);
    toggleButtonState(data, true);
    code == 0 ? success(data) : showError(data);
  });
  createPromptLineByShell(data, shell);
}

function createPromptLineByShell(data: CardConfig, shell) {
  shell.stdout.on("data", (result) => {
    const newData = result.toString() as String;
    newData.split("\n").forEach((lineText) => {
      createPromptLine(data, lineText);
    });
  });
}

function createPromptLine(data: CardConfig, lineText: string) {
  const newLine = document.createElement("p");
  newLine.innerText = lineText;
  newLine.classList.add("__card-prompt-line");
  data.prompt.appendChild(newLine);
}

function showElapsedTime(start: number) {
  const finished = new Date().getTime();
  const elapsed = finished - start;
  console.log(`Elapsed: ${elapsed}ms`);
}

function resetClasses(data: CardConfig) {
  data.buttonObject?.classList.remove(
    "__card-success",
    "__card-error",
    "__card-started"
  );
}

function flashClass(data: CardConfig, classes: string[]) {
  hideError(data);
  data.buttonObject?.classList.add(...classes);
  setTimeout(() => {
    data.buttonObject?.classList.remove(...classes);
  }, 200);
}

function showError(data: CardConfig) {
  data.buttonObject?.classList.add("__card-error");
  shell.beep();
}

function hideError(data: CardConfig) {
  data.buttonObject?.classList.remove("__card-error");
}

function success(data: CardConfig) {
  hideError(data);
  data.buttonObject?.classList.add("__card-success");
}
