const User = require("../models/User");

exports.getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Erro na rota GET /user/:id", err);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};
