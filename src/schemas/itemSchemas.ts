import { Schema, Document } from 'mongoose';
import { z } from 'zod';

interface IItem extends Document {
    name: string;
    weight: number;
    moverID: Schema.Types.ObjectId;
}

const zodItemSchema = z.object({
    body: z.object({
      name: z
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'The name must be a string'
        })
        .nonempty()
        .trim(),
      weight: z
        .number({
          required_error: 'Weight is required',
          invalid_type_error: 'Weight must be a number'
        })
    }).strict('Your request body must have just the following inputs: [name: required, weight: required]')
  });

export {IItem, zodItemSchema};