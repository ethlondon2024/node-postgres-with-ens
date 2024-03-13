/**
 * Get a socket stream compatible with the current runtime environment.
 * @returns {Duplex}
 */
module.exports.getStream = function getStream(ssl) {
  if (process.release && process.release.name === 'node') {
    const net = require('net')
    return new net.Socket()
  } else {
    const { CloudflareSocket } = require('pg-cloudflare')
    return new CloudflareSocket(ssl)
  }
}

/**
 * Get a TLS secured socket, compatible with the current environment,
 * using the socket and other settings given in `options`.
 * @returns {Duplex}
 */
module.exports.getSecureStream = function getSecureStream(options) {
  if (process.release && process.release.name === 'node') {
    var tls = require('tls')
    return tls.connect(options)
  } else {
    options.socket.startTls(options)
    return options.socket
  }
}
