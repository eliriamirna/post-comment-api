import "dotenv/config";
import express, { Application } from "express";
import routes from './routes'
const cors = require('cors');

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(routes)

export default app;