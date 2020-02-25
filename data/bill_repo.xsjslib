function _prontopagoQuery(catalog, table, accounted) {
    var zzEstatus = accounted ?
        "ZZ_ESTATUS_MON='CONTABILIZADO'" :
        "(ZZ_ESTATUS_MON='COMEX' OR ZZ_ESTATUS_MON='LOG' OR ZZ_ESTATUS_MON='PENDIENTE')";
    var docQuery = `SELECT * FROM ${catalog}.${table} WHERE RUT_PROVEEDOR=? AND FECHA_DOC>? AND ${zzEstatus}`;
    var selectSegment = 'SELECT DISTINCT Doc.*, T001.BUTXT, T001.MANDT, T001.BUKRS, T003.BLART, T003.LTEXT, T003.SPRAS';
    var joinSegmentT001 = `LEFT JOIN ${catalog}."X" as T001 ON T001.BUKRS=Doc.BUKRS AND T001.MANDT=Doc.MANDT`;
    var joinSegmentT003 = `LEFT JOIN "X"."X" as T003 ON T003.BLART=Doc.T_DOCUMENTO`;

    return `${selectSegment} FROM (${docQuery}) as Doc ${joinSegmentT001} ${joinSegmentT003}`;
}

function getProntopagoBills(rut, maxDate, accounted) {
    var connection = $.hdb.getConnection();
    var aux = _prontopagoQuery('"X"', '"X"', accounted);
    var queryAutomotiveResult = connection.executeQuery(
        _prontopagoQuery('"X"', '"X"', accounted),
        rut,
        maxDate
    );
    var queryRetailResult = connection.executeQuery(
        _prontopagoQuery('"X"', '"X"', accounted),
        rut,
        maxDate
    );

    return Array.from(queryAutomotiveResult).concat(Array.from(queryRetailResult));
}