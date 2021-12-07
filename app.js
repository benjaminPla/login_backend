import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen('3001', () => console.log('API on!'));
