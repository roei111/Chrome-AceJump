<div align="center">
  <a href="https://addons.mozilla.org/ru/firefox/addon/acejump/">
    <img width="300" height="200" src="https://github.com/cjvnjde/sharing/blob/main/Mozilla-AceJump/AceJump_logo.png?raw=true">
  </a>
</div>

[![Firefox - add-on](https://img.shields.io/static/v1?label=Firefox&message=add-on&color=%23FF7139&logo=Firefox+Browser)](https://addons.mozilla.org/ru/firefox/addon/acejump/)

## About
Mozilla AceJump is a simple extension to [the Mozilla web browser](https://www.mozilla.org/en-US/firefox/new/) that helps users navigate links without using a mouse.

#### Screenshots
<img height="400" src="https://user-images.githubusercontent.com/68147661/183308380-6a8141c7-313b-4e03-827a-1bcbc3c95078.png">
<img height="400" src="https://user-images.githubusercontent.com/68147661/183308384-47fcc749-c244-479f-8e9a-c95fc17b01f8.png">

#### Default shortcuts

+ Linux: **Ctrl+Shift+Q**
+ Windows: **Ctrl+Q**

### How to install

#### Requirements
* [node 16.*](https://nodejs.org/en/)
* [firefox](https://www.mozilla.org/en-US/firefox/new/)

#### Install dependencies
```bash
pnpm install
```
#### Bundling

##### Production bundling

````bash
pnpm bundle
````

Artifacts will be in `web-ext-artifacts` folder.

##### Developing

````bash
pnpm watch
````
````bash
pnpm start --firefox="C:\Program Files\Mozilla Firefox\firefox.exe"
````

The browser will open with the installed extension.

### TODO

- [x] Color customization
- [ ] Show only on really visible elements
- [ ] Open links with target=_blank without pop-up blocker
- [ ] Select inputs
- [ ] Select buttons
- [ ] Option to open links in a new tab
- [ ] Add more costomizations
