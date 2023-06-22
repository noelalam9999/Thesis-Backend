const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '8083'
const clientId = `mqttx_3142530b`

const connectUrl = `ws://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

const topic = 'mqtt'

module.exports = {client,topic}