<p align="center">
  <img src="https://raw.githubusercontent.com/Eomm/vscode-rainbar/742cd678b5b8ba5fa1038cf587abc4f858568cc4/images/rainbar-128.png" alt="RainBar logo" />
  <img src="https://raw.githubusercontent.com/Eomm/vscode-rainbar/main/images/rainbar-hero.png" alt="RainBar Preview" />
</p>

_Logo by [@nglngl](https://github.com/nglngl)_

## RainBar

[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/vscode-eomm.vscode-rainbar?style=plastic)](https://marketplace.visualstudio.com/items?itemName=vscode-eomm.vscode-rainbar)

Color your VSCode windows! 

RainBar is an etension for [Visual Studio Code](https://code.visualstudio.com/).  
It colors every window in VSCode with a random color palette.
It is very useful whan you have a lot of windows open and you need to switch between them.

### How it works

This extension relies on the `.vscode/settings.json` file to store the color palette.
You should add this file to your `.gitignore` file if you change the palette often.

### New palette on open

It applies a new palette to the workspace every time a new VS Code window is opened.

### Override palette

By default, RainBar will not overwrite the workspace's color customization.
You can override this behavior by turning on the `rainbar.usage.overwrite` setting.

### Apply to

Choose what RainBar should color: the title bar, the status bar or the activity bar.. or all of them!

### Themes

You can set the preferred color palette by setting the `rainbar.palette.hue` option.
Do you want to add some color palette or themes? Open a Pull Request!


## Extension Commands

| Command | Description |
|---------|-------------|
| `vscode-rainbar.applyRandomPalette` | Force to apply a new palette to the workspace |


## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

| Option | Default | Description |
| ------ | ------- | ----------- |
| `rainbar.usage.onStart`     | true | Whether to apply a new palette on start |
| `rainbar.usage.overwrite`   | false | Whether to overwrite the workspace's color customization |
| `rainbar.usage.applyTo`    | `all` | The VS's bar to color |
| `rainbar.palette.hue`       | `dark` | The preferred color theme to pick from |


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).
