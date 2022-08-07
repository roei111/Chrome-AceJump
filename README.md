<div align="center">
  <a href="https://addons.mozilla.org/ru/firefox/addon/acejump/">
    <img width="300" height="200" src="https://drive.google.com/uc?export=view&id=1J0IvMpwcRI5vhYhr_lGaAkaCuesr7kTC">
  </a>
</div>

[![Firefox - add-on](https://img.shields.io/static/v1?label=Firefox&message=add-on&color=%23FF7139&logo=Firefox+Browser)](https://addons.mozilla.org/ru/firefox/addon/acejump/)

## About
Mozilla AceJump is a simple extension that helps users navigate links without using a mouse.

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
