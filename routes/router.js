import express from 'express';
import db from '../db/index.js';
import Bcrypt from 'bcrypt';

const router = express.Router();
const bcrypt = Bcrypt;

router.get('/', (req, res) => {
  res.json({ ok: true, msg: 'all good!' });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    await bcrypt.hash(password, 10)
      .then(hash => db.create({ email: email, password: hash } ))
      .catch(error => res.json({
        ok: false,
        msg: {
          code: error.parent.code,
          errno: error.parent.errno }
        }));
  } catch (error) {
    console.log(error);
  } finally {
    res.json({ ok: true, msg: `created ${email} account!`});
  };
});

export default router;
