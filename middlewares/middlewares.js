export default {
  missingEmail: (req, res, next) => {
    !req.body.email && res.json({ ok: false, msg: 'Missing "email" field' });
    next();
  },
  missingPassword: (req, res, next) => {
    !req.body.password && res.json({ ok: false, msg: 'Missing "password" field' });
    next();
  },
};
