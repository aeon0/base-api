import { Request, Response, NextFunction } from "express";
import { User } from "models/user.model";
import { dbError } from "services/errorHandler";


export async function bindUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if(req.bindings == undefined)
        req.bindings = {};
    try {
        const param = req.params.user.toLowerCase();
        const user = await User.findOne({
            $and : [
                {
                    $or : [
                        {_id : param},
                        {email: new RegExp('^'+param+'$', 'i')},
                        {name: new RegExp('^'+param+'$', 'i')}
                    ]
                },
                { is_active : true }
            ]
        }).exec();
        if(user){
            req.bindings.user = user;
            next();
        }
        else{
            res.status(404).send();
        }
    }
    catch (err) {
        // istanbul ignore next
        dbError(res, err);
    }
}

export async function bindUserFromEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    if(req.bindings == undefined)
        req.bindings = {};
    try {
        const param = req.body.email.toLowerCase();
        const user = await User.findOne({ 
            $and : [ 
                {email : new RegExp('^'+param+'$', 'i')}, 
                { is_active : true } 
            ] 
        }).exec();
        if(user){
            req.bindings.user = user;
            next();
        }
        else{
            res.status(404).send();
        }
    }
    catch (err) {
        // istanbul ignore next
        dbError(res, err);
    }
}
