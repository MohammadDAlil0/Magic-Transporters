import express, {Router} from 'express';
import { addItem } from '../controllers/itemController';
import validate from '../utils/Zod';
import { zodItemSchema } from '../schemas/itemSchemas';

const router: Router = express.Router();

router.route('/addItem').post(validate(zodItemSchema), addItem);

export default router;