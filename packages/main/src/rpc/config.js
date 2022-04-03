import path from 'path'
// select rpc-server port (if occupied, will try += 1)
export const DEFAULT_SERVER_HOSTNAME = 'localhost'
export const DEFAULT_SERVER_PORT = 23300
export const DEFAULT_TIMEOUT = 5000
export const PYTHON_PATH = import.meta.env.DEV ? path.join(__dirname, '../../backend/.venv/Scripts/python.exe') : null
export const PROCESS_PATH = import.meta.env.DEV ? path.join(__dirname, '../../backend/src/__main__.py') : 'backend/backend.exe'
