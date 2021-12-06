import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ ok: true, msg: 'all good!' });
});

router.post('/', async (req, res) => {
  console.log(req.body);
  // const [email, password] = req.body;
  await db.create({ email: req.body.email, password: req.body.password } );
  res.json({ ok: true, mdg: 'created ' + req.body.email + ' account!'})
});

export default router;
