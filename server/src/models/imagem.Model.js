import mysql from "mysql2/promise";
import path from "path";
import url from "url";
import { } from 'fs/promises';
import db from '../conexao.js';

const fileName = url.fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export async function createImagem(descricao, nomeImg, imagem) {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: createImagem');
    const sql = 'INSERT INTO imagens (descricao,caminho) VALUES (?,?);';

    try {
        await imagem.mv(path.join(dirName, `..`,`..`,`public`, `img`,nomeImg));
        const [retorno] = await conexao.query(sql,params);
        retorno [201, `Imagem criada`]
    } catch (error) {
        console.log(error);
        return [500,error];
    }
    
    
};