import { getConnection } from "../database/database";

//Funcion get todos los usuarios y mostrar por pantalla
const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT id,name,age FROM USUARIOS");
    console.log(result);
    res.json({ result });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//Funcion añadir usuario
const addUser = async (req, res) => {
  try {
    //desestructuramos el post de postman y asi guardamos los valores que llegan
    const { id, name, age } = req.body;

    // si vienen vacios algunos de los datos necesarios salta este error
    if (name === undefined || id === undefined || age === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    // guardamos en un objeto user los valores que envia el usuario en el POST
    const user = {
      id,
      name,
      age,
    };

    //establecemos conexion con la base de datos
    const connection = await getConnection();

    //enviamos peticion a la base de datos para setear el usuario
    const result = await connection.query("INSERT INTO usuarios SET ?", user);
    res.json({ message: "User added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id,name,age FROM usuarios WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM usuarios WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    // si vienen vacios algunos de los datos necesarios salta este error
    if (name === undefined || id === undefined || age === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const user = { name, age };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [user, id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
