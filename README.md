

## About
Mozilla AceJump is a simple extension that helps users navigate links without using a mouse.

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