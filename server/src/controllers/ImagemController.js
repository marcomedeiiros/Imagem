import path from "path";
import url from "url";
import { createImagem, readImagem, updateImagem, deleteImagem } from "../models/imagemModel.js";



const fileName = url.fileURLToPath(import.meta.url);
console.log("fileName url: ", fileName);

// Dir da pasta de fileName
const dirName = path.dirname(fileName);

export async function criarImagem(req, res) {
  console.log('ImagemController :: Criando Imagem');

  const { descricao } = req.body;
  const { imagem } = req.files;

  if (!descricao || !imagem) {
    res.status(400).json({ message: 'imagem e descrição são obrigatorios' });
  } else {
    const extensao = path.extname(imagem.name).toLocaleLowerCase();
    const extensaoesPermitidas = ['.jpg', '.png', '.jpeg'];

    if (extensaoesPermitidas.includes(extensao)) {
      const nomeImg = `${Date.now()}${extensao}`;

      try {
        const [status, resposta] = await createImagem(descricao, nomeImg, imagem);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'ImagemController :: Erro' });
      }
    } else {
      res.status(415).json({ message: 'Arquiv invalido!' })
    }
  }
}

export async function mostrarImagens(req, res) {
  console.log('ImagemController :: Mostrando lista de Imagens');
  try {
    const [status, resposta] = await readImagem();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ImagemController :: Erro' });
  }
}

export async function editarImagem(req, res) {
  console.log('ImagemController :: Editando uma imagem');
  const { id_imagem } = req.params;
  const { descricao } = req.body;

  try {
    const [status, resposta] = await updateImagem(descricao, id_imagem);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ImagemController :: Erro' })
  }
}

export async function deletarImagem(req, res) {
  console.log('ImagemController :: Deletando uma imagem');
  const { id_imagem } = req.params;

  try {
    const [status, resposta] = await deleteImagem(id_imagem);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ImagemController :: Erro' })

  }
}

export async function mostrarImagem(req, res) {
  console.log("ImagemController :: Mostrando imagem");

  const { nomeImg } = req.params;

  //Acessando a pasta img a partir de controllers
  const caminho = path.join(dirName, "..", "..", 'public', 'img', nomeImg);
  console.log("caminho: ", caminho);

  res.sendFile(caminho, (err) => {
    if (err) {
      console.log("falha envio de imagem: ", err);
      res.status(404).json({ message: "Imagem não encontrada" });
    };
  });
};