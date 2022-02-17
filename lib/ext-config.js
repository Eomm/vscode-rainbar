'use strict'

module.exports = function readConfig (vscode) {
  const extensionSettings = vscode.workspace.getConfiguration('rainbar')

  return {
    hue: extensionSettings.get('palette.hue'),
    applyTo: extensionSettings.get('usage.applyTo'),
    onStart: extensionSettings.get('usage.onStart'),
    overwrite: extensionSettings.get('usage.overwrite')
  }
}
