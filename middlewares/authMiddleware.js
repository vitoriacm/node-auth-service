const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido ou expirado." });
  }
}

module.exports = checkToken;
