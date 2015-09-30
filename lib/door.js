'use strict'

let Gpio = require('onoff').Gpio
let EventEmitter = require('events').EventEmitter

class Door extends EventEmitter {
  constructor(options) {
    super()
    EventEmitter.call(this)
    this.options = options
    this.isOpen = false
    let pins = options.pins

    let sensor = new Gpio(pins.sensor, 'in', 'both')
    let statusOpen = new Gpio(pins.statusOpen, 'out')
    let statusClosed = new Gpio(pins.statusClosed, 'out')

    let update = (err, value) => {
      statusOpen.writeSync(value^1)
      statusClosed.writeSync(value)
      this.isOpen = !value
      this.emit(value ? 'close' : 'open')
    }

    sensor.read(update)
    sensor.watch(update)
  }
  toggle() {
    console.log('Door toggled')
    var doorSwitch = new Gpio(this.options.pins.doorSwitch, 'out')
    doorSwitch.writeSync(1)
    setTimeout(function() {
      doorSwitch.writeSync(0)
    }, 100)
  }
  open() {
    if (!this.isOpen) this.toggle()
  }
  close() {
    if (this.isOpen) this.toggle()
  }
}

module.exports = Door
