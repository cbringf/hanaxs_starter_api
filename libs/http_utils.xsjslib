function parseParams(params) {
    var result = {};
    
    for(var p in params) {
        result[params[p]] = $.request.parameters.get(params[p]);
    }
    return result;
}

function parseBody() {
    var body = $.request.body;
    
    return body ? JSON.parse(body.asString()) : null;
}

function buildResponse(jsonRes, status) {
    $.response.status = status || $.net.http.OK;
    $.response.headers.set("Access-Control-Allow-Origin", "*");
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify({
        result: jsonRes
    }));
}

var __export__ = [
    'parseParams',
    'parseBody',
    'buildResponse'
];