import express from "express";
import { criarImagem, editarImagem, mostrarImagem, mostrarImagens, deletarImagem } from "./controllers/ImagemController.js";
import fileUpload from 'express-fileupload';


const server = express();
const porta = 5000;

server.use(fileUpload());
server.use(express.json());

server.get('/', function (req, res) {
    res.send({ message: "api rodando em /" });
});

server.get('/public/:nomeImg', mostrarImagem);
server.post('/imagem', criarImagem);
server.get('/imagem', mostrarImagens);
server.put('/imagem/:id_imagem', editarImagem);
server.delete('/imagem/:id_imagem', deletarImagem);



server.listen(porta, console.log(`Listening on ${porta}`));