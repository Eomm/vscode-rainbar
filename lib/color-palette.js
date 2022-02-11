'use strict'

const hex = require('text-hex')
const { colord, extend } = require('colord')
const harmoniesPlugin = require('colord/plugins/harmonies')

extend([harmoniesPlugin])

module.exports = function mix (namespace) {
  const base = hex(`${namespace}`)

  const color = colord(base)
  return color.harmonies('triadic').map((c) => c.toHex())
}
