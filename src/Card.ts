export default class Card {
  public title: string = "";
  public script: string = "";
  public command: string = "";
  public url: string = "";
  public folder: string = "";

  public onClickAction: Function;

  private cardObject: HTMLDivElement;
  private buttonObject: HTMLButtonElement;
  private promptObject: HTMLDivElement;
  private promptDataObject: HTMLDivElement;
  private loaderObject: HTMLDivElement;

  private showButtonObject: HTMLButtonElement;

  constructor(card: CardConfig) {
    this.title = card.title;
    this.script = card.script || "";
    this.command = card.command || "";
    this.url = card.url || "";
    this.folder = card.folder || "";
    this.createCard();
  }

  private createCard() {
    console.log(this.script);

    const extended =
      (this.command != "" || this.script != "") && this.url == "";
    this.cardObject = document.createElement("div");
    this.cardObject.classList.add("__card");
    this.createActionButton(!extended);
    if (extended) {
      this.createShowButton();
      this.createPrompt();
      this.createPromptData();
    }
  }

  private createLoader() {
    this.loaderObject = document.createElement("div");
    this.loaderObject.classList.add("__card-button-loader");
  }

  private createActionButton(extended?: boolean) {
    this.createLoader();
    this.buttonObject = document.createElement("button");
    this.buttonObject.innerText = this.title;
    this.buttonObject.appendChild(this.loaderObject);
    this.buttonObject.classList.add("__card-button");
    extended && this.buttonObject.classList.add("__card-button-extended");
    this.cardObject.appendChild(this.buttonObject);

    this.buttonObject.addEventListener("click", (e) => {
      this.onClickAction({
        title: this.title,
        script: this.script,
        command: this.command,
        url: this.url,
        folder: this.folder,
        prompt: this.promptDataObject,
        buttonObject: this.buttonObject,
      });
    });
  }

  private createShowButton() {
    this.showButtonObject = document.createElement("button");
    this.showButtonObject.innerText = "prompt";
    this.showButtonObject.classList.add("__card-show");
    this.cardObject.appendChild(this.showButtonObject);

    this.showButtonObject.addEventListener("click", (e) => {
      this.promptObject.classList.toggle("__card-hidden");
    });
  }

  private createPrompt() {
    this.promptObject = document.createElement("div");
    this.promptObject.classList.add("__card-prompt", "__card-hidden");
    this.cardObject.appendChild(this.promptObject);
  }

  private createPromptData() {
    this.promptDataObject = document.createElement("div");
    this.promptDataObject.classList.add("__card-prompt-data");
    this.promptObject.appendChild(this.promptDataObject);
  }

  public getElement() {
    return this.cardObject;
  }
}

export interface CardConfig {
  title: string;
  script: string;
  command: string;
  url: string;
  folder?: string;
  separator?: boolean;
  prompt?: HTMLDivElement;
  buttonObject?: HTMLButtonElement;
}
