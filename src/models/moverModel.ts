import mongoose from 'mongoose';
import { IMover } from '../schemas/moverSchemas';

const moverSchema = new mongoose.Schema({
    name: String,
    weightLimit: {
        type: Number,
        required: [true, 'A mover must have a weight Limit']
    },
    questState: {
        type: String,
        enum: ['resting', 'loading', 'on-mission'],
        default: 'resting'
    },
    missionsCount: {
        type: Number,
        default: 0
    }
});

export default mongoose.model<IMover>('Mover', moverSchema);