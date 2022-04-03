import net from 'net'

/**
 * Get an available port. If default_port is occupied, default_port + 1 will
 * be tried, and so on, until get an available port.
 * @param {string} hostname The hostname to get the port
 * @param {int} defaultPort The default port
 * @returns {int} Available port
 */
export async function getAvailablePort (hostname, defaultPort) {
  if (defaultPort < 1024 || defaultPort > 49151) {
    throw RangeError('defaultPort must be between 1024 and 49151 (the range of RegisteredPorts).')
  }
  let port = defaultPort
  while (1) {
    if (await checkPortAvailability(hostname, port)) {
      break
    } else {
      if (port >= 49151) {
        throw Error(`No available port found between ${defaultPort} and 49151.`)
      } else {
        port++
      }
    }
  }
  return port
}

/**
 * Check if the specified port is available.
 * @param {string} hostname
 * @param {int} port
 * @returns {Promise<boolean>} If the specified port is available
 */
export function checkPortAvailability (hostname, port) {
  const server = net.createServer().listen(port, hostname)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      server.close()
      resolve(true)
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false)
      } else {
        reject(err)
      }
    })
  })
}
