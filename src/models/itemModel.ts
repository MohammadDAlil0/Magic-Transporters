import mongoose from 'mongoose';
import { IItem } from '../schemas/itemSchemas';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An item must have a name']
    },
    weight: {
        type: Number,
        required: [true, 'An item must have a weight']
    },
    moverID: {
        type: mongoose.Types.ObjectId,
        ref: "Mover"
    }
});

export default mongoose.model<IItem>('item', itemSchema);