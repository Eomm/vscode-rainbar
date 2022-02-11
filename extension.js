'use strict'

const vscode = require('vscode')

const applyColor = require('./lib/apply-color')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-rainbar" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('vscode-rainbar.helloWorld', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from vscode-rainbar!')

    applyColor()
  })

  context.subscriptions.push(disposable)

  applyColor()
}

function deactivate () {
  // TODO restore color
}

module.exports = {
  activate,
  deactivate
}
