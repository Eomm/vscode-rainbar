'use strict'

const vscode = require('vscode')

const readConfig = require('./lib/ext-config')
const stateManager = require('./lib/ext-state')
const applyColor = require('./lib/apply-color')

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate (context) {
  const state = stateManager(context)

  const disposable = vscode.commands.registerCommand('vscode-rainbar.applyRandomPalette', applyPalette.bind(null, { state, force: true }))
  context.subscriptions.push(disposable)

  const { onStart } = readConfig(vscode)
  if (onStart) {
    await applyPalette({ state })
  }
}

async function applyPalette (opts) {
  try {
    if (!vscode.workspace.workspaceFolders) {
      return
    }
    const { title } = await applyColor(opts)
    vscode.window.setStatusBarMessage(`RainBar palette: ${title}`, 2600)
  } catch (error) {
    vscode.window.showErrorMessage(`Error applying RainBar palette:\n${error.message}`)
    console.error(error)
  }
}

function deactivate () {
  // do nothing
}

module.exports = {
  activate,
  deactivate
}
