/**
 * Get a socket stream compatible with the current runtime environment.
 * @returns {Duplex}
 */
module.exports.getStream = function getStream(ssl) {
  try {
    const { CloudflareSocket } = require('pg-cloudflare')
    return new CloudflareSocket(ssl)
  } catch {
    const net = require('net')
    return new net.Socket()
  }
}

/**
 * Get a TLS secured socket, compatible with the current environment,
 * using the socket and other settings given in `options`.
 * @returns {Duplex}
 */
module.exports.getSecureStream = function getSecureStream(options) {
  try {
    options.socket.startTls(options)
    return options.socket
  } catch {
    var tls = require('tls')
    return tls.connect(options)
  }
}
