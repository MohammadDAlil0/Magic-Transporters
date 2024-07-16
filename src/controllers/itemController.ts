import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Item from '../models/itemModel';

export const addItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item = await Item.create(req.body);
    res.status(201).json({
        status: "success",
        data: item
    });
});