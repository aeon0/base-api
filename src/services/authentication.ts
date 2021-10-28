import { Request } from "express";
import { User } from "models/user.model";
var crypto = require('crypto');


export function getToken(req: Request) : string {
    let bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        let bearer: string[] = bearerHeader.split(" ");
        return bearer.length > 1 ? bearer[1] : null;
    }
    else{
        return null;
    }
}

export async function loggIn(req: Request, bearerToken: string) : Promise<boolean>  {
    try {
        const user = await User.findOne({ $and : [ 
            {token: bearerToken}, 
            {is_active : true},
        ]});
        if(user){
            req.authuser = user;
        }
        return true;
    }
    catch (err) {
        throw new Error(err);
    }
}

export function isLoggedIn(req: Request) {
    return ((req.authuser != undefined) && (req.authuser != null));
}

export function sha512(password: string, salt: string) {
    var hash = crypto.createHmac('sha512', salt);
    var value = "";
    if(password != "" && password != undefined){
        hash.update(password);
        value = hash.digest('hex');
    }
    return value;
};