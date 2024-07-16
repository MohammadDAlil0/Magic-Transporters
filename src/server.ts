import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, '../config.env')});
import app from './app';

mongoose.connect(process.env.DATABASE_URL!)
.then(() => {
    console.log('Connected to the database successfuly!');
})
.catch(() => {
    console.log('Unable to connect to the database :(');
});

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log(err.name, err.message);
    console.log('UNHANDLE REJECTION', "Shutting down...");
    server.close(() => {
      process.exit(1);
    });
});