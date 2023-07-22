const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const connection = require("./database/conection");
const cadastrouser = require("./database/cadastro_usuario");
const { where } = require("sequelize");
const usuario = require("./database/cadastro_usuario");

//configurando body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//configurando ejs
app.set("view engine", "ejs");

//configurando arquivos staticos
app.use(express.static("public"));

//configuracao da conexao com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

//Rota principal
app.get("/", (req, res) => {
  res.render("index");
});

//Rota Home
app.get("/home", (req, res) => {
  res.send("<h1>Pagina Home acessada com sucesso</h1>");
});

//Rota main
app.get("/main", (req, res) => {
  res.render("page/main");
});

//Rota login
app.get("/login", (req, res) => {
  res.render("login");
});

//Rota cadastro
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

//Rota de cadastro de usuarios
app.post("/cadastro-user", (req, res) => {
  var email = req.body.email
  var senha = req.body.senha

  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(senha , salt)

  cadastrouser.create({
    email: email,
    senha: hash,
    senha_2: req.body.senha_2,
  }).then(function(){
    res.redirect('/login')
  }).catch(function(error){
    res.send("houve um erro ao cadastrar um novo usuario"+ error)
  });
});

//Rota para logado com sucesso
app.post('/logado' , (req , res)=>{
  var email = req.body.email
  var senha = req.body.senha

  cadastrouser.findOne({where:{email}}).then(usuario  => {
    if(usuario!=undefined){
      var correct = bcrypt.compareSync(senha , usuario.senha)
      if(correct){
        res.send('seja bem vindo')
      }else{
        res.redirect('/cadastro')
      }
    }else{
      res.redirect('/cadastro')
    }
  })
})

//Rota filmes
app.get("/filmes", (req, res) => {
  res.render("page/filmes");
});
//Rota para filmes play
app.get("/avatar", (req, res) => {
  res.render("page/avatar");
});

//Rota series
app.get("/series", (req, res) => {
  res.render("page/series");
});
//Rota para series play
app.get("/RBD", (req, res) => {
  res.render("page/RBD");
});

//Rota animes
app.get("/animes", (req, res) => {
  res.render("page/animes");
});
//Rota para animes play
app.get("/jujutsukaizen", (req, res) => {
  res.render("page/jujutsukaizen");
});

//Rota para contato
app.get("/contato", (req, res) => {
  res.render("partials/contato");
});

//iniciando o servidor
app.listen(port, () => {
  console.log("Servidor online");
});
