# Hub tools

![](https://i.imgur.com/8rOsH4r.png)
This project was created to facilitate and perform some repetitive tasks that can end up taking a lot of time throughout the day, in addition to reducing the amount of terminals and other open windows.

## Features:

- Run bash scripts with just 1 click.
- Execute various commands, in sequence, or not.
- Open files/folders.
- Open links in browser.
- Minimize the amount of open windows.
<hr>

### Home screen:

<br />
[![](https://i.imgur.com/SfOXmRr.png)](https://i.imgur.com/SfOXmRr.png)
<hr>

### See prompt output:

By clicking on "prompt" you will have access to the return of the files that are being executed, which were programmed to be in this button.
see below:
<br />
![](https://i.imgur.com/y8V6ehN.png)

<hr>

### Perform action:

To execute the action programmed for the button, just click on its title. In the case of the image below, **"Execute shell"** was clicked.
Note that during the execution of the file, a loader will appear, which will remain running until the execution is finished.
<br />
![](https://i.imgur.com/TLVuJK8.png)

<hr>

### Results:

When the file is finished executing, in case of success, the title of the button will change to _green_, and a _green_ border will be added to it. In case of error, the same will happen, however, with the _red_ color.
<br />
![](https://i.imgur.com/WCcWaII.png)

<hr>

### Minimized window:

When you click close the window, the application will be minimized to your operating system's task tray.
To open it again, just click once on the icon, or right-click and select the **"Show App"** option.
<br />
![](https://i.imgur.com/wPJPpHs.png)

<hr>

## How to configure your commands:

When you open the project folder you will find a file called **"config.json"**.
This file has all the information for the tool to work.

#### Adding a separator:

`{
      "title": "Separator title",
      "separator": true
},`

#### Adding a new script:

`{
       "title": "Script title",
       "script": "path to file"
},`

#### Adding a new command:

`{
        "title": "Command title",
       "command": "command 1 && command 2..."
},`

#### Adding a new link:

`{
        "title": "Url title",
       "url": "https://www.google.com/"
},`

#### Adding a new folder:

`{
        "title": "Folder title",
       "folder": "explorer ."
},`

#### Adding a new file:

`{
        "title": "File title",
       "folder": "start ./loader.png"
}`

## How to get the project:

Make sure you have node installed, this is a dependency of this project. If you don't have it, just install it, following the steps on this site:
[Node](https://nodejs.org/en/download/ "Node")

Open a terminal, navigate to the desired folder to save this project and use the command below:

> git clone https://github.com/MatheusLM/hub-tools.git

Upon completion, use:

> cd hub-tools && npm install

After installing all project dependencies, just start it:

> npm start

###### _I hope you enjoy_
