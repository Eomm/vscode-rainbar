'use strict'

const path = require('path')
const fs = require('fs').promises
const { colord, extend } = require('colord')
const harmoniesPlugin = require('colord/plugins/harmonies')
extend([harmoniesPlugin])

module.exports = {
  generatePalette,
  desaturate
}

async function generatePalette (hue) {
  // optimization: loading the file every time, will not fille the memory
  // within the palettes, but it will load/unload every time keeping the
  // memory free to use for the developer
  const paletteFile = await fs.readFile(path.join(__dirname, '../palette', `${hue}.json`))
  const paletteRoulette = JSON.parse(paletteFile)

  const magicNumber = randomBetween(0, paletteRoulette.length - 1)
  const palette = paletteRoulette[magicNumber]

  return {
    title: palette.title,
    background: `#${palette.colors.bg}`,
    foreground: `#${palette.colors.fg}`,
    border: `#${palette.colors.br}`
  }
}

function desaturate (color, amount = 0.2) {
  return colord(color).desaturate(amount).toHex()
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
