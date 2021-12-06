import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ ok: true, msg: 'all good!' });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    await db.create({ email, password } );
  } catch(error) {
    res.json({
      ok: false,
      msg: { code: error.parent.code, errno: error.parent.errno }} );
  } finally {
    res.json({ ok: true, msg: `created ${email} account!`})
  };
});

export default router;
