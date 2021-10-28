import { Router, Request, Response } from "express";
import { getToken, loggIn } from "./services/authentication";
import { dbError } from "services/errorHandler";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({ message: "Reached API!"});
});

// Login the user, valid for all the routes that are following
router.use(async function(req, res, next) {
    const token = getToken(req);
    if (token != null){
        try {
            await loggIn(req, token);
            next();
        }
        catch (err) {
            // istanbul ignore next
            dbError(res, err);
        }
    }
    else{
        next();
    }
});

// Register API Endpoints here
import { register as login } from "apiRequest/user/login"; login(router);
import { register as createUser } from "apiRequest/user/createUser"; createUser(router);
import { register as updateUser } from "apiRequest/user/updateUser"; updateUser(router);
import { register as getUser } from "apiRequest/user/getUser"; getUser(router);
import { register as getUsers } from "apiRequest/user/getUsers"; getUsers(router);
import { register as changePassword } from "apiRequest/user/changePassword"; changePassword(router);
import { register as setInactive } from "apiRequest/user/setInactive"; setInactive(router);

// podcast routes 

// anlytic routes

export default router;
