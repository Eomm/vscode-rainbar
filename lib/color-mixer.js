'use strict'

const hex = require('text-hex')
const path = require('path')
const { colord, extend, random } = require('colord')
const harmoniesPlugin = require('colord/plugins/harmonies')

extend([harmoniesPlugin])

module.exports = {
  generatePalette,
  chooseFontColor,
  desaturate
}

function generatePalette (hue) {
  const palettes = require(path.join(__dirname, '../palette', `${hue}.json`))

  const { colors: palette } = palettes[randomBetween(0, palettes.length - 1)]

  return {
    background: `#${palette[randomBetween(0, 4)]}`,
    foreground: `#${palette[randomBetween(0, 4)]}`,
    border: `#${palette[randomBetween(1, 4)]}`
  }
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function chooseFontColor (bg) {
  const color = colord(bg)
  // if(color.isDark()){
  //   return color.harmonies("complementary").pop().toHex()
  // }
  // return color.harmonies("complementary").pop().toHex()
  return color.invert().toHex()
  // return '#000000'
}

function desaturate (color, amount = 0.2) {
  return colord(color).desaturate(amount).toHex()
}
