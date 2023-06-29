const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

// Configurar o multer para armazenar as imagens no diretório 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rota GET para testar o servidor
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Rota POST para upload de imagem
app.post('/upload-image', upload.single('image'), (req, res) => {
  // Verificar se foi enviado um arquivo de imagem
  if (!req.file) {
    return res.status(400).json({
      error: true,
      message: 'Nenhuma imagem foi enviada.',
    });
  }

  // Aqui você pode realizar a lógica de processamento e armazenamento da imagem
  // Por exemplo, você pode renomear o arquivo, movê-lo para outro diretório, salvar informações no banco de dados, etc.

  // Retornar uma resposta de sucesso
  return res.json({
    success: true,
    message: 'Imagem enviada com sucesso.',
    filename: req.file.filename,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
