import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Mover from '../models/moverModel';
import Item from '../models/itemModel';
import AppError from "../utils/AppError";

export const addMover = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const mover = await Mover.create(req.body);
    res.status(201).json({
        status: "success",
        data: mover
    });
});

export const loadItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {moverID, itemsID} = req.body;
    const mover = await Mover.findById(moverID);
    if (!mover) {
        return next(new AppError('There is no mover with that ID', 404));
    }
    if (mover.questState !== 'resting') {
        return next(new AppError('This mover is not free now', 400));
    }
    const items = await Item.find({_id: {$in: itemsID}, $or: [{moverID: null}, {moverID: undefined}]});
    if (items.length !== itemsID.length) {
        return next(new AppError('Some of these items don\'t exist', 400));
    }
    let sum = 0;
    for (const item of items) {
        sum += item.weight;
    }
    if (sum > mover.weightLimit) {
        return next(new AppError('This mover can\'t carry these weights', 400));
    }
    for (const item of items) {
        item.moverID = moverID;
        await item.save();
    }
    mover.questState = 'loading';
    await mover.save();
    res.status(200).json({
        status: 'success',
        message: 'The magic mover is loading items...'
    });
});

export const startMission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const mover = await Mover.findById(req.body.moverID);
    if (!mover) {
        return next(new AppError('There is no mover with that ID', 404));
    }
    if (mover.questState !== 'loading') {
        return next(new AppError('The mover\'s state is not loading', 400));
    }
    mover.questState = 'on-mission';
    await mover.save();
    res.status(200).json({
        status: 'success',
        message: 'Mession has started successfuly!'
    });
});

export const endMission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const moverID = req.body.moverID;
    const mover = await Mover.findById(moverID);
    if (!mover) {
        return next(new AppError('There is no mover with that ID', 404));
    }
    if (mover.questState !== 'on-mission') {
        return next(new AppError('The mover\'s state is not on-mission', 400));
    }
    await Item.deleteMany({moverID: moverID});
    mover.questState = 'resting';
    mover.missionsCount++;
    await mover.save();
    res.status(200).json({
        status: 'success',
        message: 'Mission completed successfuly!'
    });
});


export const getTopMovers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const movers = await Mover.find().sort({ missionsCount: -1 }).limit(10);
    res.status(200).json({
        status: 'success',
        result: movers.length,
        data: movers
    });
});


