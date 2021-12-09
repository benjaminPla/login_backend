import express from 'express';
import db from '../db/index.js';
import Sequelize from 'sequelize';
import Bcrypt from 'bcrypt';
import middlewares from '../middlewares/middlewares.js';

const router = express.Router();
const Op = Sequelize.Op;
const bcrypt = Bcrypt;

router.post('/signin',[middlewares.missingEmail, middlewares.missingPassword],
async (req, res) => {
  const { email, password } = req.body;

  const user = await db.findOne({
    where: { email }} );
  !user && res.json({ ok: false, msg: 'User not found'});

  if (!await bcrypt.compare(password, user.password)) {
    res.json({ ok: false, msg: 'Data do not match'});
  } else {
    res.json({ ok: true, msg: `Welcome ${email}!` });
  };
});

router.post('/signup', [
  middlewares.missingEmail,
  middlewares.missingPassword
  ], async (req, res) => {
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
