
from typing import Any, Callable, Iterable, List, Mapping
from types import MappingProxyType


class ApiRouteError(Exception):
    def __init__(self, *args, **kwargs):
        super(ApiRouteError, self).__init__(*args, **kwargs)


class ApiRouter:
    """
    Manage API register and route. ApiRoute is singleten so it can be 
    instantiated in different modules safely.
    """
    __instance = None
    __mapping = {}

    mapping = MappingProxyType(__mapping)
    
    def __new__(cls):
        if not cls.__instance:
            cls.__instance = super().__new__(cls)
        return cls.__instance

    def __check_route_format(self, route):
        if not isinstance(route, str):
            raise TypeError('parameter route should be str')

    def list_apis(self) -> List:
        """
        List all the API routes.
        """
        return sorted(self.mapping.keys())

    def route(self, route: str) -> Callable:
        """
        A decorator, register the decorated function to ApiRouter.

        Args:
            route: API route.
        """
        def decorator(func):
            self.register(route, func)
            return func
        return decorator

    def register(self, route: str, method: Callable) -> None:
        """
        Registers a method to an API route.

        Args:
            route: API route.
            method: The method to register to the API route.
        """
        self.__check_route_format(route)
        if not callable(method):
            raise TypeError('parameter method should be callable')
        if route in self.mapping:
            raise KeyError('route {} has already been registered. you should delete it before re-register.')
        self.__mapping[route] = method

    def delete(self, route: str) -> None:
        """
        Remove an API route registration.
        """
        self.__mapping.pop(route)

    def register_from_map(self, api_map: Mapping[str, Callable]) -> None:
        """
        Registers multiple APIs with a Mapping.

        Args:
            api_map: A mapping of API routes to methods.
        """
        for route, method in api_map.items():
            self.register(route, method)

    def invoke_api(self, route: str, args: Iterable = [], kwargs: Mapping = {}) -> Any:
        """
        Invokes an API and returns the result.

        Args:
            route: API route.
            args: The positional arguments to pass the registered API method.
            kwargs: The keyword arguments to pass the registered API method.
        """
        try:
            _method = self.mapping[route]
        except KeyError:
            raise ApiRouteError('route does not exist: {}'.format(route))
        reply = _method(*args, **kwargs)
        return reply
