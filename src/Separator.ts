export default class Separator {
  public title: string = "";
  public path: string = "";
  public command: string = "";
  public url: string = "";

  public onClickAction: Function;

  private separatorObject: HTMLParagraphElement;

  constructor(title: string) {
    this.title = title;
    this.createSeparator();
  }

  private createSeparator() {
    this.separatorObject = document.createElement("p");
    this.separatorObject.innerText = this.title;
    this.separatorObject.classList.add("__card-separator");
  }

  public getElement() {
    return this.separatorObject;
  }
}

export interface CardConfig {
  title: string;
  path: string;
  command: string;
  url: string;
  separator?: boolean;
}
