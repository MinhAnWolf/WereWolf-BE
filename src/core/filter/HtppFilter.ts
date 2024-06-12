import { NextFunction } from "express";
const jwt = require('jsonwebtoken');

function HtppFilter(req:Request, res:Response, next:NextFunction) {
    if (req.url === ApiConstant.API_LOGIN || req.url === ApiConstant.API_REGISTER) {
        next();
    }
    
    // check header access and rf
    let access = req.headers.get('access');
    let rf = req.headers.get('rf');
    if (access !== null && rf !== null) {
        
    }
}

function genJwt() {
    
}

function validatorJwt() {
    
}

function deJwt() {
    
}

export default HtppFilter;