'use strict'

const vscode = require('vscode')

const { generatePalette } = require('./color-mixer')
const readConfig = require('./ext-config')

const COLOR_KEY = 'colorCustomizations'

module.exports = async function applyColor ({ force } = {}) {
  const {
    hue,
    applyTo,
    overwrite
  } = readConfig(vscode)

  const palette = await generatePalette(hue)

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
function buildTitleBar (palette) {
  return {
    'titleBar.activeBackground': palette.backgroundTop,
    'titleBar.activeForeground': palette.foreground,
    'titleBar.inactiveBackground': palette.backgroundTopInactive,
    'titleBar.inactiveForeground': palette.foregroundInactive,
    'titleBar.border': palette.border
  }
}

// https://code.visualstudio.com/api/references/theme-color#activity-bar
function buildActivityBar (palette) {
  return {
    'activityBar.background': palette.backgroundActivity,
    'activityBar.foreground': palette.foreground,
    'activityBar.inactiveForeground': palette.foregroundInactive,
    'activityBar.activeBorder': palette.borderActive,
    'activityBar.activeBackground': palette.backgroundActive,
    'activityBar.border': palette.border
  }
}

// https://code.visualstudio.com/api/references/theme-color#status-bar-colors
function buildStatusBar (palette) {
  return {
    'statusBar.background': palette.backgroundBottom,
    'statusBar.foreground': palette.foreground,
    'statusBar.border': palette.border
  }
}
