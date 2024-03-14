/**
 * Get a socket stream compatible with the current runtime environment.
 * @returns {Duplex}
 */
module.exports.getStream = function getStream(ssl) {
  if (isCloudflareRuntime) {
    const { CloudflareSocket } = require('pg-cloudflare')
    return new CloudflareSocket(ssl)
  } else {
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
  if (isCloudflareRuntime) {
    options.socket.startTls(options)
    return options.socket
  } else {
    var tls = require('tls')
    return tls.connect(options)
  }
}

/**
 * Are we running in a Cloudflare Worker?
 * 
 * @returns true if the code is currently running inside a Cloudflare Worker.
 */
function isCloudflareRuntime() {
  return Boolean(process.release && process.release.name !== 'node' && Response && new Response(null, { cf: { thing: true } }).cf.thing === true);
}