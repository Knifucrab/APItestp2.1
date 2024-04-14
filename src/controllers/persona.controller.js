import { getConnection } from "../database/database";

//Funcion get todos las personas y mostrar por pantalla
const getPersonas = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombre,dni,birth_date FROM persona"
    );
    console.log(result);
    res.json({ result });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//Funcion añadir persona
const addPersona = async (req, res) => {
  try {
    //desestructuramos el post de postman y asi guardamos los valores que llegan
    const { nombre, dni, birth_date } = req.body;

    // si vienen vacios algunos de los datos necesarios salta este error
    if (nombre === undefined || dni === undefined || birth_date === undefined) {
      res
        .status(400)
        .json({ messbirth_date: "Bad Request. Please fill all field." });
    }

    // guardamos en un objeto Persona los valores que envia el usuario en el POST
    const Persona = {
      nombre,
      dni,
      birth_date,
    };

    //establecemos conexion con la base de datos
    const connection = await getConnection();

    //enviamos peticion a la base de datos para setear el usuario
    const result = await connection.query("INSERT INTO persona SET ?", Persona);
    res.json({ message: "Persona added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getPersona = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombre,dni,birth_date FROM persona WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM persona WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dni, birth_date } = req.body;

    // si vienen vacios algunos de los datos necesarios salta este error
    if (nombre === undefined || dni === undefined || birth_date === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const Persona = { nombre, dni, birth_date };
    const connection = await getConnection();
    const result = await connection.query("UPDATE persona SET ? WHERE id = ?", [
      Persona,
      id,
    ]);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getPersona,
  getPersonas,
  addPersona,
  deletePersona,
  updatePersona,
};
