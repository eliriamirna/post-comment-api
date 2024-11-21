import "dotenv/config";
import express, { Application } from "express";
import routes from './routes'
const cors = require('cors');
import path from 'path';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(routes)

export default app;