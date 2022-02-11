'use strict'

const vscode = require('vscode')

const palette = require('./color-palette')

const COLOR_KEY = 'colorCustomizations'

module.exports = async function color (random) {
  const settings = vscode.workspace.getConfiguration('workbench')

  const colorIngredient = vscode.workspace.workspaceFolders[0].uri.path
  const colorPalette = palette(random ? Math.random() : colorIngredient)

  const currentColorCustomization = settings.get(COLOR_KEY)
  console.log(currentColorCustomization['statusBar.background'])

  // TODO
  // settings: statusbar, titlebar, both
  // custom color overrides yes/no
  // force new color via command

  try {
    await settings.update(
      COLOR_KEY,
      {
      // https://code.visualstudio.com/api/references/theme-color#status-bar-colors
        'statusBar.background': colorPalette[2],
        'statusBar.foreground': colorPalette[1],
        'statusBar.border': colorPalette[0]

      },
      vscode.ConfigurationTarget.Workspace
    )
  } catch (error) {
    // todo IMPOSSIBLE TO UPDATE CONFIGURATION
  }
}
