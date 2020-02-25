var rootLibPath = "PortalProveedores/cloud";
var requireLibPath = "PortalProveedores.cloud.require.xsjslib";

$.import(requireLibPath, "_");

var requireLib = $.PortalProveedores.cloud.require._;

var config = requireLib(`${rootLibPath}/config/default/__export__`, true);
var envConfig = requireLib(`${rootLibPath}/config/${config.env}/__export__`, true);

var http = requireLib(`${rootLibPath}/libs/http_utils`);

var routePath = http.parseParams(['route']);

function _normalizeStringRoute(route) {
	var routeSegments = route.split("/");

	return {
		file: routeSegments[0],
		handler: routeSegments[1],
		params: routeSegments.slice(1).filter(function(s) {
			return s.startsWith(":");
		})
	};
}

function _normalizeComplexRoute(route, handler) {
	var file = Object.keys(route)[0];

	for (var i in route[file]) {
		var relativePath = route[file][i];

		if (relativePath === handler || relativePath.substr(0, relativePath.indexOf("/")) === handler) {
			return _normalizeStringRoute(`${file}/${relativePath}`);
		}
	}
	throw new Error("Invalid route");
}

function _containsHandler(route, handler) {
	if (typeof route === 'object') {
		var file = Object.keys(route)[0];
		var relativePaths = route[file];

		for (var i in relativePaths) {
			var relativePath = relativePaths[i];

			if (relativePath === handler || relativePath.substr(0, relativePath.indexOf("/")) === handler) {
				return true;
			}
		}
		return false;
	} else {
		return route.indexOf(handler) === route.indexOf("/") + 1;
	}
}

function _buildRequiredRoute(routes, handler) {
	var result = [];

	for (var i in routes) {
		if (_containsHandler(routes[i], handler)) {
			return typeof routes[i] === 'object' ?
				_normalizeComplexRoute(routes[i], handler) :
				_normalizeStringRoute(routes[i]);
		}
	}
	return null;
}

if (!routePath || !routePath.route) {
	http.buildResponse('Missing route', $.net.http.NOT_FOUND);
} else {
	var routes = requireLib(`${rootLibPath}/routes/index/__export__`, true);
	var routeHandler = _buildRequiredRoute(routes, routePath.route);

	if (!routeHandler) {
		http.buildResponse('Missing route', $.net.http.NOT_FOUND);
	} else {
		var route = requireLib(`${rootLibPath}/routes/${routeHandler.file}/${routePath.route}`, true);
		var req = {
			params: http.parseParams(routeHandler.params.map(function(p) {
				return p.slice(1);
			})),
			body: http.parseBody()
		};
		var res = {
			send: http.buildResponse
		}

		route({
			require: function(libPath, isFn) {
				libPath = libPath.startsWith('/') && config.rootModulePath ?
					libPath :
					`${config.rootModulePath}/${libPath}`;
				return requireLib(libPath, isFn);
			},
			_require: requireLib,
			config: Object.assign({}, config, envConfig)
		}, req, res);
	}
}