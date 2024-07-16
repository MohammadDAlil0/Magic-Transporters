//1) packages
import express, {Express, Response, NextFunction} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

//2) Get Routes
import moverRouter from './routes/moverRoute'
import itmeRouter from './routes/itemRoute';

//3) Controllers
import errorController from './controllers/errorController';

//4) Const Variables
const app: Express = express();

//5) Midlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(helmet());
const limiter = rateLimiter({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again after one houre'
});
app.use('/api', limiter);
app.use(express.json({limit: '10KB'}));
app.use(mongoSanitize());

//6) Routes
app.use('/api/v1/movers', moverRouter);
app.use('/api/v1/items', itmeRouter);

//7) Error Handler
app.use(errorController);

export default app;