import db from '../conexao.js';
import mysql from "mysql2/promise";

export async function createUsuario(usuario) {
    console.log('UsuarioModel :: createUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'INSERT INTO usuarios (login,senha,funcao) VALUES (?,?,?)';

    const params = [
        usuario.login,
        usuario.senha,
        usuario.funcao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [201, { message: 'Usuario Cadastrado' }]
    } catch (error) {
        console.log(error);
        return [500, { message: 'Erro ao cadastrar usuário' }]
    }
}

export async function readUsuario() {
    console.log('UsuarioModel :: readUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM usuarios';

    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno];
    } catch (error) {
        return [500, error];
    }
}


export async function showOneUsuario(id_usuario) {
    console.log('UsuarioModel :: showOneUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM usuarios WHERE id_usuarios=?';
    const params = [id_usuario];

    try {
        const [retorno] = await conexao.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'Usuario não encontrado ' }];
        } else {
            return [200, retorno[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'Erro ao mostrar usuário'}]            
    }
} 

export async function findUserByLoginPassword(login, senha) {
    console.log('UsuarioModel :: findUserByLoginPassword');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario FROM usuarios WHERE login = ? AND senha = ?';
    params 
    try {
        const [retorno] = await conexao.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'Usuario ou senha invalidos' }];
        } else {
            return [200, retorno[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'Erro ao mostrar usuário'}]
    }
    
}