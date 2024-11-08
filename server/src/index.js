import express from "express";
import { criarImagem, editarImagem, dowloadImagem, mostrarImagens, deletarImagem, mostrarUmaImagem } from "./controllers/ImagemController.js";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { criarUsuario, logarUsuario, mostracaodeusuario, mostrarUmUsuario } from "./controllers/UsuarioController.js";


const server = express();
const porta = 5000;

server.use(fileUpload());
server.use(express.json());
server.use(cors());

server.get('/', function (req, res) {
    res.send({ message: "api rodando em /" });
});

server.get('/public/:nomeImg', dowloadImagem);
server.post('/imagem', criarImagem);
server.get('/imagem', mostrarImagens);
server.put('/imagem/:id_imagem', editarImagem);
server.delete('/imagem/:id_imagem', deletarImagem);

server.get('/imagem/:id_imagem', mostrarUmaImagem)

server.post('/usuario', criarUsuario);
server.get('/usuario', mostracaodeusuario);
server.get('/usuario/:id_usuario', mostrarUmUsuario);

server.post('/login', logarUsuario)



server.listen(porta, console.log(`Listening on ${porta}`));