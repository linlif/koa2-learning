/**
 * @description jest server
 * @author Linlif
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)