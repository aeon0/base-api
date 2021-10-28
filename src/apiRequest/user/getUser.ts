import { Request, Response, NextFunction, Router } from "express";
import { isLoggedIn } from "services/authentication";
import { bindUser } from "middleware/bindings";


export function register(router: Router) {
    router.get('/user/:user', auth, bindUser, getUser);
}

function auth(req: Request, res: Response, next: NextFunction) {
    if(isLoggedIn(req)) {
        next();
    }
    else {
        res.status(401).send();
    }
}

function getUser(req: Request, res: Response) {
    res.json(req.bindings.user);
}
