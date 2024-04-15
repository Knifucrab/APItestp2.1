import { getConnection } from "../database/database";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "your_jwt_secret";

const login = async (req, res) => {
  const { nombreUsuario, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por nombre de usuario
    const connection = await getConnection();
    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE nombreUsuario = ?",
      [nombreUsuario]
    );

    if (!usuario) {
      return res.status(401).send("Nombre de usuario o contraseña incorrectos");
    }

    // Verificar la contraseña hasheada
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res
        .status(401)
        .send(
          "Nombre de usuario o contraseña incorrectos (contrasenia incorrecta)"
        );
    }

    // Generar un token de autenticación
    const token = jwt.sign({ usuarioId: usuario.id }, JWT_SECRET);

    // Devolver el token al cliente
    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error al iniciar sesión");
  }
};

const registro = async (req, res) => {
  const { nombreUsuario, password } = req.body;

  // Hashear la password antes de almacenarla en la base de datos
  const passwordHasheada = await bcrypt.hash(password, 10);

  // Guardar el usuario en la base de datos
  try {
    const connection = await getConnection();
    await connection.query(
      "INSERT INTO usuarios (nombreUsuario, password) VALUES (?, ?)",
      [nombreUsuario, passwordHasheada]
    );
    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario");
  }
};

// Middleware para verificar el token de autenticación
function verificarToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.send("Debe enviar token");
  }
  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).send("Token de autenticacion invalido");
    }
    req.usuario = usuario;
    next();
  });
}

export const methods = {
  login,
  registro,
  verificarToken,
};
