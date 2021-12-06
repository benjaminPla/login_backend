import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'all good!' });
});

app.listen('3001', () => console.log('API on!'));
