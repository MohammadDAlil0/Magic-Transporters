import { Document } from 'mongoose';
import { z } from 'zod'; 

interface IMover extends Document {
  name: string;
  weightLimit: number;
  questState: 'resting' | 'loading' | 'on-mission';
  missionsCount: number;
}

const zodMoverSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'The name must be a string'
      })
      .trim()
      .optional(),
    weightLimit: z
      .number({
        required_error: 'WeightLimit is required',
        invalid_type_error: 'WeightLimit must be a number'
      })
  }).strict('Your request body must have just the following inputs: [name: optional, weightLimit: required]')
});


export {IMover, zodMoverSchema};