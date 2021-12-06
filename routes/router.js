import express from 'express';
import db from '../db/index.js';
import Bcrypt from 'bcrypt';

const router = express.Router();
const bcrypt = Bcrypt;

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.findOne({ where: { email } });
  if (user === null) {
    res.json({ ok: false, msg: 'User not found'});
  } else {
    res.json({ ok: true, msg: `Welcome ${email}!` });
  };
});

router.post('/signup', async (req, res) => {
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
    res.json({ ok: true, msg: `Created ${email} account!`});
  };
});

export default router;
