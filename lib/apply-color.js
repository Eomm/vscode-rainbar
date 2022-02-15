'use strict'

const vscode = require('vscode')

const color = require('./color-mixer')
const readConfig = require('./ext-config')

const COLOR_KEY = 'colorCustomizations'

module.exports = async function applyColor ({ force } = {}) {
  const {
    hue,
    applyTo,
    overwrite
  } = readConfig(vscode)

  const palette = await color.generatePalette(hue)

  const activityBarColor = (applyTo === 'activity' || applyTo === 'all')
    ? buildActivityBar(palette)
    : null

  const titleBarColor = (applyTo === 'title' || applyTo === 'all')
    ? buildTitleBar(palette)
    : null

  const statusBarColor = (applyTo === 'status' || applyTo === 'all')
    ? buildStatusBar(palette)
    : null

  const settings = vscode.workspace.getConfiguration('workbench')
  const currentColorCustomization = settings.get(COLOR_KEY)

  await settings.update(
    COLOR_KEY,
    {
      ...currentColorCustomization,
      ...activityBarColor,
      ...titleBarColor,
      ...statusBarColor,
      ...(overwrite || force ? {} : currentColorCustomization)
    },
    vscode.ConfigurationTarget.Workspace
  )
  return palette
}

// https://code.visualstudio.com/api/references/theme-color#title-bar-colors
function buildTitleBar ({ background, foreground, border }) {
  return {
    'titleBar.activeBackground': background,
    'titleBar.activeForeground': foreground,
    'titleBar.inactiveBackground': color.desaturate(background, 0.25),
    'titleBar.inactiveForeground': color.desaturate(foreground, 0.25),
    'titleBar.border': border
  }
}

// https://code.visualstudio.com/api/references/theme-color#activity-bar
function buildActivityBar ({ background, foreground, border }) {
  return {
    'activityBar.background': background,
    'activityBar.foreground': foreground,
    'activityBar.inactiveForeground': color.desaturate(foreground, 0.6),
    'activityBar.activeBorder': color.invert(background),
    'activityBar.activeBackground': border,
    'activityBar.border': border
  }
}

// https://code.visualstudio.com/api/references/theme-color#status-bar-colors
function buildStatusBar ({ background, foreground, border }) {
  return {
    'statusBar.background': background,
    'statusBar.foreground': foreground,
    'statusBar.border': border
  }
}
