const jwt = require("jsonwebtoken");
const cookie = require('cookie');

function authenticateToken(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.authToken;

  if (!token) {
    return res.redirect("/admin/admin/login/page");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next(); 
  });
}
module.exports = authenticateToken;
