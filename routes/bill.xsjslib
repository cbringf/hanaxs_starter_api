function prontopagoBills(context, req, res) {
    var billRepo = context.require('data/bill_repo');

    if (!req.params || !req.params.rut || !req.params.maxDate || !req.params.accounted) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        res.send(billRepo.getProntopagoBills(req.params.rut, req.params.maxDate, JSON.parse(req.params.accounted)));
    }
}

function createProntopago(context, req, res) {
    var billRepo = context.require('data/bill_repo');
    
    if (!req.params || !(req.params.rut && req.body)) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        var billsList = req.body.bills;
        
        res.send(billRepo.createProntopago(req.params.rut, billsList));
    }
}