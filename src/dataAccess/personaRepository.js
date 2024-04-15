const db = require("./database");

async function getPersonas() {
  return await db.query("SELECT nombre,dni,birth_date FROM persona");
}

async function addPersona(nombre, dni, birth_date) {
  const Persona = {
    nombre,
    dni,
    birth_date,
  };

  try {
    const result = await db.query("INSERT INTO persona SET ?", Persona);
  } catch (error) {}
}

async function getPersona(id) {
  return await db.query(
    "SELECT nombre,dni,birth_date FROM persona WHERE id = ?",
    2
  );
}

module.exports = {
  getPersonas,
  addPersona,
  getPersona,
};
