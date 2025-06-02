const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado - Token não fornecido" });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido ou expirado" });
  }
};

module.exports = checkToken;
