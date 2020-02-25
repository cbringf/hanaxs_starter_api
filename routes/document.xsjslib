function getDocumentTypes(context, req, res) {
    var documentUtils = context.require('data/document_repo');
    
    if(!req.params || !req.params.rut) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        res.send(documentUtils.getDocumentTypesByPattern(req.params.rut));   
    }
}