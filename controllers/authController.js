const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ msg: "As senhas não coincidem" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ msg: "Por favor, use outro email" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: passwordHash });
    await user.save();

    return res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota /auth/register:", error);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: "Email e senha são obrigatórios" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    return res.status(200).json({ msg: "Autenticado com sucesso", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};
