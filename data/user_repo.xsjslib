function isValid(bill, rut) {
    var connection = $.hdb.getConnection();
    var billMaxDate = new Date();
    
    billMaxDate.setMonth(billMaxDate.getMonth() - 3);
    
    var strMaxDate = `${billMaxDate.getFullYear()}${billMaxDate.getMonth()}${billMaxDate.getDate()}`;
    var query = 'SELECT * FROM "X"."X" WHERE FECHA_DOC>? AND RUT_PROVEEDOR=? AND FOLIO=?';
    var queryResult = connection.executeQuery(query, strMaxDate, rut, bill);
    
    return Array.from(queryResult).length > 0;
}