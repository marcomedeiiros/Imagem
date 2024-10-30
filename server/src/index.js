import express from "express";
import mostrarImagem, { CriarImagem } from "./controllers/ImagemController.js";
const server = express();
const porta = 5000;

server.use(fileUpload());

server.get('/', function(req,res){
    res.send({ message: "api rodando em /" });
});

server.get('/public/:nomeImg', mostrarImagem)
server.post('/imagem', CriarImagem);

server.listen(porta, console.log(`Listening on ${porta}`));