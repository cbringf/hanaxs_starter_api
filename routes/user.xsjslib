function validUser(context, req, res) {
    var userRepo = context.require('data/user_repo');
    var userData = req.params;
    
    if(!userData || !(userData.rut && userData.bill)) {
        res.send('Invalid parameters', $.net.http.BAD_REQUEST);
    } else {
        res.send(userRepo.isValid(userData.bill, userData.rut));
    }
}