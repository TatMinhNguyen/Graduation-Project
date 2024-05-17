const jwt = require("jsonwebtoken");
const BlackListTokenModel = require("../models/BlackListTokenModel");

const middleware = {
    // check token đã xóa
    isTokenBlacklisted: async (token) => {
        try {
            const blacklistedToken = await BlackListTokenModel.findOne({ token });
            return !!blacklistedToken;
        } catch (err) {
            console.error('Error checking blacklisted token:', err);
            return false;
        }
    },
    verifyToken : async(req, res, next) => {
        //ACCESS TOKEN FROM HEADER
          const token = req.headers.token;
          
          if (token) {
            const isBlacklisted = await middleware.isTokenBlacklisted(token);

            if (isBlacklisted) {
                return res.status(403).json({ message: 'Token is blacklisted' });
            }

            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
              if (err) {
                res.status(403).json("Token is not valid!");
              }
              req.user = user;
              next();
            });
          } else {
            res.status(401).json("You're not authenticated");
          }
    },
}

module.exports = middleware;