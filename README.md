# linkding extension (forked)

Companion extension for the self-hosted [linkding](https://github.com/sissbruecker/linkding) bookmark service.

**Warning**
> This is a fork of the original [linkding-extension](https://github.com/sissbruecker/linkding-extension), extension, modified to suit my own specific needs and uses.

**Features**
- Quickly add a bookmark for the current tab (keyboard shortcut: <kbd>Alt</kbd><kbd>Shift</kbd><kbd>L</kbd>)
- Search bookmarks through the Omnibox / address bar (keyword: <kbd>ld</kbd>)
- Quickly delete bookmarks directly from web extension
- Shortcut to your hosted linkding homepage

Works with: Firefox, Chrome

**Screenshot**

![Screenshot](/docs/screenshot.png?raw=true "Screenshot")

## Installation

### Forked extension

Firefox: Forget it.

Chrome: Forget it too.

### Original extension

Firefox: [Mozilla Addon Store](https://addons.mozilla.org/de/firefox/addon/linkding-extension/)

Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/linkding-extension/beakmhbijpdhipnjhnclmhgjlddhidpe) 

## Manual installation

### Firefox

Run the build as described below and then follow the instructions [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) to load it into Firefox.

### Chrome

Run the build as described below from the `chrome` branch and then follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest) to load it into Chrome.

## Build

**Requirements**
- Latest LTS Node version
- Latest LTS NPM version
- bash
- zip

Run the following bash script to generate a build (might need to make the file executable using `chmod +x build.sh`):

**Build for Firefox and Firefox-based**
```bash
./build.sh
# or
./build.sh firefox
# or
bash build.sh
# or
bash build.sh firefox
```

**Build for Chrome and Chromium-based**
```bash
./build.sh
# or
./build.sh firefox
# or
bash build.sh
# or
bash build.sh firefox
```

The script does:
- Install all dependencies using NPM
- Runs rollup to transpile and minify source files, with output written to `build`
- Copy right manifest to manifest.json
- Packages the extension contents into a zip file in the `dist` folder

After the build, the root directory contains the complete, unpackaged extension. Use the `manifest.json` file to load it manually into the browser.

The packaged extension can be found in the `dist` folder.

## Clean

Basic clean after build (`build`, `dist`, `manifest.json`).
```bash
./clean.sh
# or
bash clean.sh
```

Full clean after build (`build`, `dist`, `manifest.json`, `node_modules`).
```bash
./clean.sh --all
# or
bash clean.sh --all
```
