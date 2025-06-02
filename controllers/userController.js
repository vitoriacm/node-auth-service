const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await authService.registerUser(
      name,
      email,
      password,
      confirmPassword
    );
    res.status(201).json({ msg: "Usuário criado com sucesso!", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ msg: "Autenticado com sucesso", token });
  } catch (error) {
    next(error);
  }
};
