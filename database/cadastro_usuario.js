//cadastro usuario
const sequelize = require("sequelize");
const conection = require("../database/conection");

const usuario = conection.define("usuarios", {
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: sequelize.STRING,
    allowNull: false,
  },
  senha_2: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

//usuario.sync({ force: false }).then(() => {});
module.exports = usuario;