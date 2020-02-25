# hanaxs_starter_api
Starter HANA XS backend.

# Base files

api.xsjs

Is the system entry point to use URLs with the following structure. (~/api.xsjs?route=handlerFn&[list of args]).
For the corrent request handling, this router (api.xsjs) needs the route folder to read index.xsjslib file and
initialize the router.

require.xsjslib

This lib allows developers to use a simple module system to export functionalities. This functionality is passed as an argument of requests handlers to load modules for database access or other functionalities.

libs/http_utils.xsjslib

This module allows developers to use request/response params like expressjs framework handlers.

# Summary

This starter app is intended to improve developers productivity, and to save time using stable boilerplate code to focus only on the new system particular needs.
