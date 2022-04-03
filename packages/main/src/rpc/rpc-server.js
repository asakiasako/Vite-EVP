/**
 * Settings of RPC
 */
import { spawn, execFile } from 'child_process'

import { dialog } from 'electron'
import electronLog from 'electron-log'

import { PYTHON_PATH, PROCESS_PATH } from './config'

export class RpcServer {
  /**
   * Launch RPC server subprocess
   * @param {string} hostname
   * @param {int} port
   * @param {object} environ
   */
  constructor (hostname, port, environ = {}) {
    Object.assign(environ, {
      RPC_SERVER_HOSTNAME: hostname,
      RPC_SERVER_PORT: port
    })

    if (import.meta.env.MODE === 'development') {
      /**
       * Development Mode: run python
       */
      this.process = spawn(
        PYTHON_PATH,
        [PROCESS_PATH],
        {
          env: Object.assign(process.env, environ)
        }
      )
      // pipe child process stdio to main process if in development mode
      this.process.stdout.pipe(process.stdout)
      this.process.stderr.pipe(process.stderr)
    } else {
      /**
       * Production Mode: run compiled exe
       */
      this.process = execFile(
        PROCESS_PATH,
        undefined,
        {
          env: Object.assign(process.env, environ)
        },
        (err) => {
          if (err) {
            dialog.showErrorBox('RPC Server Crashed', `${err}`)
            electronLog.error(err)
          }
        }
      )
    }
    if (this.process) {
      this.hostname = hostname
      this.port = port
      this.process.on('close', () => {
        this.hostname = undefined
        this.port = undefined
      })
      console.log(`RPC Server Process running on - ${hostname}:${port}`)
    } else {
      throw Error('Failed to start RPC Server Process.')
    }
  }

  isAlive () {
    return this.process.exitCode !== null
  }

  close () {
    if (this.isAlive) {
      this.process.removeAllListeners().kill()
    }
  }
}
