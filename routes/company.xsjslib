function getCompaniesByPattern(context, req, res) {
    var companyUtils = context.require('data/company_repo');
    
    if(!req.params || !req.params.pattern) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        res.send(companyUtils.getCompaniesByPattern(req.params.pattern));
    }
}