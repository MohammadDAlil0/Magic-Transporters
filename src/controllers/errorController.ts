import { Request, Response, NextFunction } from "express"
import { IError } from "../schemas/errorSchema";
import AppError from "../utils/AppError";

const sendErrDev = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err
    });
}

const sendErrProd = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

const handleZodError = (error: any) => {
    const message = error.issues[0].message;
    return new AppError(message, 400);
};
  

export default (err: IError, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ZodError') 
        err = handleZodError(err);
  
    if (err.code === 'ETIMEDOUT') {
        err.message = 'It took a lot of time getting data. Be sure codeforces is working correctly handling requstes then try again.';
        err.statusCode = 408
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (process.env.NODE_ENV === 'development') {
        sendErrDev(err, res);
    }   
    else {
        sendErrProd(err, res);
    }
}