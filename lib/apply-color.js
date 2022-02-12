'use strict'

const vscode = require('vscode')

const color = require('./color-mixer')

const COLOR_KEY = 'colorCustomizations'

module.exports = async function applyColor (random) {
  const settings = vscode.workspace.getConfiguration('workbench')
  const extensionSettings = vscode.workspace.getConfiguration('rainbar')

  const hue = extensionSettings.get('palette.hue')
  const applyTo = extensionSettings.get('usage.applayTo')
  const overwrite = extensionSettings.get('usage.overwrite')

  const {
    background,
    border,
    foreground
  } = color.generatePalette(hue)

  if (overwrite === false) {
    // todo: check if color is already set
    const currentColorCustomization = settings.get(COLOR_KEY)
    console.log(currentColorCustomization['statusBar.background'])
  }

  const font = color.chooseFontColor(foreground)

  let titleBarColor = null
  if (applyTo === 'title' || applyTo === 'both') {
    titleBarColor = {
      // https://code.visualstudio.com/api/references/theme-color#title-bar-colors
      'titleBar.activeBackground': background,
      'titleBar.activeForeground': font,
      'titleBar.inactiveBackground': color.desaturate(background),
      'titleBar.inactiveForeground': color.desaturate(font),
      'titleBar.border': border
    }
  }

  let statusBarColor = null
  if (applyTo === 'status' || applyTo === 'both') {
    statusBarColor = {
      // https://code.visualstudio.com/api/references/theme-color#status-bar-colors
      'statusBar.background': background,
      'statusBar.foreground': font,
      'statusBar.border': border
    }
  }

  // TODO
  // custom color overrides yes/no
  // force new color via command

  try {
    await settings.update(
      COLOR_KEY,
      {
        ...currentColorCustomization,
        ...titleBarColor,
        ...statusBarColor
      },
      vscode.ConfigurationTarget.Workspace
    )
  } catch (error) {
    // todo IMPOSSIBLE TO UPDATE CONFIGURATION
    console.error(error)
  }
}
