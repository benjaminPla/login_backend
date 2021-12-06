import express from 'express';
import router from './routes/router.js';

const app = express();
app.use(router);

app.listen('3001', () => console.log('API on!'));
