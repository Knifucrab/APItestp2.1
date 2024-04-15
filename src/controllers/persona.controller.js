const personaService = require("../services/personaService");

//Funcion get todos las personas y mostrar por pantalla
const getPersonas = async (req, res) => {
  try {
    const personas = await personaService.getPersonas();
    res.json(personas);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios");
  }
};

//Funcion añadir persona
const addPersona = async (req, res) => {
  //desestructuramos el post de postman y asi guardamos los valores que llegan
  const { nombre, dni, birth_date } = req.body;

  try {
    await personaService.addPersona(nombre, dni, birth_date);
    res.json({ message: "Persona added" });
  } catch (error) {
    res.status(500);
    res.send("Fallo al añadir persona");
  }
};

const getPersona = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await personaService.getPersona(id);
    res.json(persona);
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
