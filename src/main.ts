"use strict";
import { app, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
let isQuiting;
let tray: Tray;
let mainWindow: BrowserWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 480,
    width: 360,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    maxWidth: 720,
    minWidth: 360,
    minHeight: 240,
    maximizable: false,
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.menuBarVisible = false;

  //mainWindow.webContents.openDevTools();

  mainWindow.on("close", function (event) {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });
}

function createTray() {
  tray = new Tray("./icon.png");
  tray.setToolTip("Hub Tools");
  tray.on("click", () => mainWindow.show());
  /* tray.displayBalloon({
    title: "teste",
    content: "contet"
  }); */

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show App",
        click: function () {
          mainWindow.show();
        },
      },
      {
        label: "Hide App",
        click: function () {
          mainWindow.hide();
        },
      },
      {
        label: "Quit",
        click: function () {
          isQuiting = true;
          app.quit();
        },
      },
    ])
  );
}

app.on("before-quit", () => (isQuiting = true));

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on(
    "activate",
    () => BrowserWindow.getAllWindows().length === 0 && createWindow()
  );
});

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
