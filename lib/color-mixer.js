'use strict'

const path = require('path')
const fs = require('fs').promises
const { colord, extend } = require('colord')
const harmoniesPlugin = require('colord/plugins/harmonies')
extend([harmoniesPlugin])

module.exports = {
  generatePalette
}

async function generatePalette (hue) {
  // optimization: loading the file every time, will not fille the memory
  // within the palettes, but it will load/unload every time keeping the
  // memory free to use for the developer
  const paletteFile = await fs.readFile(path.join(__dirname, '../palette', `${hue}.json`))
  const paletteRoulette = JSON.parse(paletteFile)

  const magicNumber = randomBetween(0, paletteRoulette.length - 1)
  const palette = paletteRoulette[magicNumber]

  const bgTop = palette.colors.ti || palette.colors.bg
  const bgBottom = palette.colors.st || palette.colors.bg

  return {
    title: palette.title,

    backgroundTop: H(bgTop),
    backgroundTopInactive: desaturate(H(bgTop), 0.25),

    foreground: H(palette.colors.fg),

    foregroundInactive: desaturate(H(palette.colors.fg), 0.6),
    foregroundActive: H(palette.colors.fg),

    backgroundActivity: H(palette.colors.bg),
    backgroundActive: H(palette.colors.br),
    borderActive: invert(H(palette.colors.bg)),

    backgroundBottom: H(bgBottom),

    border: H(palette.colors.br)
  }
}

function desaturate (color, amount) { return colord(color).desaturate(amount).toHex() }
function invert (color) { return colord(color).invert().toHex() }
function H (color) {
  return `#${color}`
}
function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
