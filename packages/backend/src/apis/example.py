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
    raise ValueError('ABCdef')
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
