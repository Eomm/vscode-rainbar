'use strict'

const vscode = require('vscode')

module.exports = async function color () {
  const settings = vscode.workspace.getConfiguration('workbench')
  console.log({ settings })

  const currentColorCustomization =
  settings.get('colorCustomizations') || {}

  console.log(currentColorCustomization['statusBar.background'])

  await settings.update(
    'colorCustomizations',
    {
      'statusBar.background': '#ff00ff',
      'statusBar.foreground': '#ff00ff'

    },
    vscode.ConfigurationTarget.Workspace
  )
}
