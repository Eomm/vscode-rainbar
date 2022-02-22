'use strict'

module.exports = function state (context) {
  return {
    read,
    write
  }

  function read () {
    return {
      lastPaletteTitleApplied: context.globalState.get('lastPaletteApplied')
    }
  }

  async function write (newState) {
    await context.globalState.update('lastPaletteApplied', newState.lastPaletteTitleApplied)
  }
}
