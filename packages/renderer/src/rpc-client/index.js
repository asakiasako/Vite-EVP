
const STATUS_CODE = [
  'OK', // 0
  'CANCELLED', // 1
  'UNKNOWN', // 2
  'INVALID_ARGUMENT', // 3
  'DEADLINE_EXCEEDED', // 4
  'NOT_FOUND', // 5
  'ALREADY_EXISTS', // 6
  'PERMISSION_DENIED', // 7
  'RESOURCE_EXHAUSTED', // 8
  'FAILED_PRECONDITION', // 9
  'ABORTED', // 10
  'OUT_OF_RANGE', // 11
  'UNIMPLEMENTED', // 12
  'INTERNAL', // 13
  'UNAVAILABLE', // 14
  'DATA_LOSS', // 15
  'UNAUTHENTICATED' // 16
]

const decodeError = ({ name, message, extra }) => {
  const code = extra.code
  const details = extra.details
  const status = STATUS_CODE[code]
  const err = new Error(details)
  err.name = status
  return err
}

export const rpcClient = {
  async waitForReady (timeout) {
    const { error, result } = await window.rpcClient.waitForReady(timeout)
    if (error) {
      throw decodeError(error)
    }
    return result
  },

  async request (options, timeout) {
    const { error, result } = await window.rpcClient.request(options, timeout)
    if (error) {
      throw decodeError(error)
    }
    return result
  },

  async listApis (timeout) {
    const { error, result } = await window.rpcClient.listApis(timeout)
    if (error) {
      throw decodeError(error)
    }
    return result
  }
}
