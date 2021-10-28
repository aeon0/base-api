// Extend the Request interface with custom fields
declare namespace Express {
    export interface Request {
        authuser: import("models/user.model").IUser,
        authJob: any,
        bindings: {
            user?: import("models/user.model").IUser
        },
    }
}
