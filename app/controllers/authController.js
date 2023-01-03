const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDatamapper = require('../models/userDatamapper');

const authController = {

   async login(req, res) {
      const { email, password } = req.body;

      if (!(email && password)) {
         return res.status(400).json({ errorMessage: 'All input are required ' });
      }
      const user = await userDatamapper.findByEmail(email);

      if (!user) {
         return res.status(401).json({ errorMessage: 'email or password incorrect' });
      }

      const passwordVerified = await bcrypt.compare(password, user.password);

      if (user && passwordVerified) {
         const accesToken = jwt.sign(
            {
               UserInfo: {
                  email: user.email,
                  username: user.username,
                  role: user.role,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' },
         );
         const refreshToken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' },
         );

         res.cookie('jwt', refreshToken, {
               httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000,
         });
         return res.json({ role: user.role, accesToken });
      }
         return res.sendStatus(401);
   },
};

module.exports = authController;
