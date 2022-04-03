# Vite EVP

Vite EVP means Vite Electron-Vue-Python. This is a template for electron application, using Vue for rendering UI, and python as backend.

[Vite](https://vitejs.dev/) is used as bundler (instead of webpack). [electron-builder](https://www.electron.build/) is used for building. gRPC is used to expose python APIs to electron (but you don't need to understand gRPC). [Ant-Design of Vue](https://next.antdv.com/) is used as the UI components.

Thanks to [Alex Kozack](https://github.com/cawa-93), I started this template based on his [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder).

## Installation

- Environment: 
  - Node.js >= 16.14.2
  - Python >= 3.8.10
  - [Poetry](https://python-poetry.org/) (A python package manager)

- cd to the project root and run script:

    ``` bash
    npm install
    ```
    This will install the dependencies for both Node.js and python. And the project is ready to go.

## Scripts

- `npm run serve`
  
    Run the app in development environment.

- `npm run build`

    Build executables. The default configs in `/electron-builder.config.js` will build an `.exe` installer for windows.

## Project Structure

The entire source code of the program is divided into 4 packages that are each bundled independently:

- `packages/main`: Electron main process.
- `packages/preload`: Used in `BrowserWindow.webPreferences.preload`.
- `packages/renderer`: Electron renderer process.
- `packages/backend`: A python package, the backend to expose APIs.
## RPC (Remote Process Call) between Electron App and python backend

The python backend exposes APIs. The Electron App realizes specific functions by calling these APIs.

### Expose API in python package

Refer to `/packages/backend/src/apis/example.py` for examples. 

Note that `ApiRoute` is singleton, so it can be instantiated in different modules safely.

``` python
# /packages/backend/src/apis/examples.py

from datetime import datetime
import platform

from .ApiRouter import ApiRouter

# ApiRouter is singleton so it can be instantiated safely in different modules.
router = ApiRouter()

# --- Example 1: register an API with a decorator
@router.route(':get-current-time')
def get_current_time() -> str:
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')

# --- Example 2: register an API with method
def get_python_info() -> str:
    return {
        'Python Version': platform.python_version(),
        'Architecture': ", ".join(platform.architecture()),
        'Implementation': platform.python_implementation()
    }

router.register(':get-python-info', get_python_info)

# --- Example 3: register API with register_from_map() method
#
# In large projects, it's a good practice to organise APIs in seperated 
# files and use register_from_map() to summarize the APIs.
ROUTES = {
    ':arithmetic:add': lambda x, y: x+y,
    ':arithmetic:multiply': lambda x, y: x+y,
    ':arithmetic:abs': abs
}

router.register_from_map(ROUTES)
```

### Invoke API in electron

In electron, an `rpcClient` object is used to invoke those APIs. `rpcClient` is in Main Process and exposed to Renderer Process with `preload.js`.

An alias `$rpcClient` is registered as a global property of the Vue app. So you can use it like this in Vue component with options API:

``` js
this.$rpcClient.request({
  route: ':route:to:the:api',
  args: [arg1, arg2], // args if any
  kwargs: { key1: value1 } // kwargs if any
}, timeout) // optional timeout parameter to change the default timeout
```

With composition API, you can use `window.rpcClient`, or use inject method:

``` js
window.rpcClient.request(...)
// or
const that = inject('app.globals')
that.$rpcClient.request(...)
```

Please refer to `/packages/main/src/rpc/rpc-client.js` for the `RpcClient` object.

## Global Properties

``` js
app.config.globalProperties.$rpcClient = window.rpcClient
app.config.globalProperties.$lodash = lodash
```

Please refer to `/packages/renderer/src/main.js` for the source.
