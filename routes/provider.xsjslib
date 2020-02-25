function getProvidersByPattern(context, req, res) {
    var providerUtils = context.require('data/provider_repo');
    
    if(!req.params || !req.params.pattern) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        res.send(providerUtils.getProvidersByPattern(req.params.pattern, req.params.limit));
    }
}