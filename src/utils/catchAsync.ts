import { Request, Response, NextFunction } from "express";
import { IError } from "../schemas/errorSchema";

export default (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: IError) => {
        next(err);
    });
}