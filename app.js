require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const User = require("./models/User");

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Bem-vindo à API",
  });
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Erro na rota GET /auth/:id", err);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
});

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

app.post("/auth/register", async (req, res) => {
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

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    await user.save();

    return res.status(201).json({
      msg: "Usuário criado com sucesso!",
    });
  } catch (error) {
    console.error("Erro na rota /auth/register:", error);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
});

app.post("/auth/login", async (req, res) => {
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

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    return res.status(200).json({ msg: "Autenticado com sucesso", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.9jqkwl0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("✅ Conectado ao MongoDB e servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
