const personaRepository = require("../dataAccess/personaRepository");

async function getPersonas() {
  return await personaRepository.getPersonas();
}

async function addPersona(nombre, dni, birth_date) {
  try {
    await personaRepository.addPersona(nombre, dni, birth_date);
  } catch (error) {
    console.error("Error en personaService", error);
  }
}

async function getPersona(id) {
  try {
    await personaRepository.getPersona(id);
  } catch (error) {
    console.error("Error en personaService", error);
  }
}

module.exports = {
  getPersonas,
  addPersona,
  getPersona,
};
