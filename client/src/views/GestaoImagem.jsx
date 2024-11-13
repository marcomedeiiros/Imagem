import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function GestaoImagem() {
    const [imagens, setImagens] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [idUsuario, setIdusuario] = useState('');
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [funcao, setFuncao] = useState('');

    useEffect(() => {
        carregarImagens()
        if (idUsuario === '') {
            try {
                const id_usuario = localStorage.getItem('id_usuario');
                if (!id_usuario) {
                    alert('Efetue Login')
                    navigate('/login');
                } else {
                    setIdusuario(id_usuario);
                    getNomeFuncao(id_usuario);
                }
            } catch (error) {
                console.log('')
            }
        }
        carregarImagens();
    }, []);

    async function getNomeFuncao(id_usuario) {
        console.log(`http://localhost:5000/usuario/${id_usuario}`);
        try {
            const resposta = await fetch(`http://localhost:5000/usuario/${id_usuario}`);
            const dados = await resposta.json();
            if (dados) {
                console.log(dados);
                setLogin(dados.login);
                setFuncao(dados.funcao);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarImagem() {
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('caminho', imagem);

        try {
            const resposta = await fetch('http://localhost:5000/imagem', {
                method: 'POST',
                body: formData
            })
            if (!resposta) {
                throw new Error('Erro ao cadastro imagem');
            } else {
                console.log('aymar')
                // carregarImagens();
            }
        } catch (error) {
            throw new Error('Erro ao cadastro imagem', error);
        }
    }

    async function carregarImagens() {
        try {
            const resposta = await fetch('http://localhost:5000/imagem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta) {
                throw new Error('Erro ao buscar imagens')
            }
            const consulta = await resposta.json();
            setImagens(consulta);
        } catch (error) {
            console.log('Erro ao buscar imagens', error)
        }
    }

    async function deletarImagem(id_imagem) {
        try {
            const resposta = await fetch(`http://localhost:5000/imagem/${id_imagem}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!resposta.ok) {
                const error = await resposta.json();
                throw new Error('Erro ao deletar imagem', error);
            } else {
                setImagens(imagens.filter(imagem => imagem.id_imagem !== id_imagem));
            }
        } catch (error) {
            throw new Error('Erro ao deletar imagem', error)
        }
    }

    function logout() {
        localStorage.removeItem('id_usuario');
        navigate('/login');
    }

    return (
        <>
            <div>
                <nav className='container'>
                    <span>Logo</span>
                    <ul>
                        <li>Inicio</li>
                    </ul>
                    <button className='btn btn-danger' onClick={logout}>Logout</button>
                </nav>
            </div>
            <div className='container'>
                <h1 className='text-center'>Gestão Imagens</h1>
                <h2>{`Bem vindo ${login}`}</h2>
                <h3>{funcao === 'adm' && 'voce e administrador!!!'}</h3>
                <div>
                    <h2>Cadastrar imagem</h2>
                    <label htmlFor="">Descrição</label>
                    <input className='form-control' type="text" value={descricao} onChange={e => (setDescricao(e.target.value))} />
                    <label htmlFor="">Imagem</label>
                    <input className='form-control' type="file" onChange={e => (setImagem(e.target.files[0]))} name='' id='' />
                    <button className='btn btn-sucess mt-2' onClick={cadastrarImagem}>Cadastrar</button>
                </div>
                <div className='row mt-2'>
                    {imagens.map((imagem) => (
                        <div className='col-md-3' key={imagem.id_imagem}>
                            <img className='img-thumbnail' src={`http://localhost:5000/public/${imagem.caminho}`} alt={imagem.descricao} />
                            <div className="mt-2">
                                <button className='btn btn-primary '>Editar</button>
                                <button className='btn btn-danger float-end'
                                    onClick={() => deletarImagem(imagem.id_imagem)}>Deletar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default GestaoImagem;