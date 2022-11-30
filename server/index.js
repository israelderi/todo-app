import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import taskRoure from './routes/Task.js';
import userRoure from './routes/user.js';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("DB connect")
    }).catch((error) => {
        console.log(error)
    });

app.use("/api/user", userRoure);
app.use("/api/task", taskRoure);

app.listen(process.env.PORT, () => {
   console.log('server is runing')
});
