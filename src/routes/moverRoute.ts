import express, {Router} from 'express';
import { addMover, endMission, getTopMovers, loadItems, startMission } from '../controllers/moverController';
import validate from '../utils/Zod';
import { zodMoverSchema } from '../schemas/moverSchemas';

const router: Router = express.Router();

router.route('/addMover').post(validate(zodMoverSchema), addMover);

router.patch('/loadItems', loadItems);
router.patch('/startMission', startMission);
router.patch('/endMission', endMission);

router.get('/getTopMovers', getTopMovers);

export default router;
