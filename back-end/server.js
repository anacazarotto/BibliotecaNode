import express from "express";
import banco from "./banco.js";
import categoria from "./controller/Categoria.js";
import autor from "./controller/Autor.js";
import editora from "./controller/Editora.js";
import emprestimo from "./controller/Emprestimo.js";
import livro from "./controller/Livro.js";
import livroautor from "./controller/LivroAutor.js";
import pessoa from "./controller/Pessoa.js";
import funcionario from "./controller/Funcionario.js";

try {
    banco.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.get("/autor", autor.listar);
app.get("/autor/:idautor", autor.selecionar);
app.post("/autor", autor.criar);
app.put("/autor/:idautor", autor.alterar);
app.delete("/autor/:idautor", autor.excluir);

/**
{
    "autor": "autor"
}
*/

app.get("/categoria", categoria.listar);
app.get("/categoria/:idcategoria", categoria.selecionar);
app.post("/categoria", categoria.criar);
app.put("/categoria/:idcategoria", categoria.alterar);
app.delete("/categoria/:idcategoria", categoria.excluir);

/**
{
    "categoria": "categoria"
}
*/

app.get("/editora", editora.listar);
app.get("/editora/:ideditora", editora.selecionar);
app.post("/editora", editora.criar);
app.put("/editora/:ideditora", editora.alterar);
app.delete("/editora/:ideditora", editora.excluir);

/**
{
    "editora": "editora"
}
*/

app.get("/emprestimo", emprestimo.listar);
app.get("/emprestimo-pendentes", emprestimo.listar_pendentes);
app.get("/emprestimo/:idemprestimo", emprestimo.selecionar);
app.post("/emprestimo", emprestimo.criar);
app.put("/emprestimo/:idemprestimo", emprestimo.alterar);
app.delete("/emprestimo/:idemprestimo", emprestimo.excluir);

/**
{
    "vencimento": "2024-04-08",
    "devolucao": "2024-04-08",
    "idlivro": 8,
    "idpessoa": 1
}
*/

app.get("/livro", livro.listar);
app.get("/livro/:idlivro", livro.selecionar);
app.post("/livro", livro.criar);
app.put("/livro/:idlivro", livro.alterar);
app.delete("/livro/:idlivro", livro.excluir);

/**
{
    "titulo": "livro",
    "ano": 2000,
    "paginas": 100,
    "edicao": 2,
    "resumo": "resumo",
    "emprestado": true,
    "idcategoria": 1,
    "ideditora": 1
}
*/

app.get("/livroautor", livroautor.listar);
app.get("/livroautor/:idlivroautor", livroautor.selecionar);
app.post("/livroautor", livroautor.criar);
app.put("/livroautor/:idlivroautor", livroautor.alterar);
app.delete("/livroautor/:idlivroautor", livroautor.excluir);

/**
{
    "idlivro": 1,
    "idautor": 1
}
*/

app.get("/pessoa", pessoa.listar);
app.get("/pessoa/:idpessoa", pessoa.selecionar);
app.post("/pessoa", pessoa.criar);
app.put("/pessoa/:idpessoa", pessoa.alterar);
app.delete("/pessoa/:idpessoa", pessoa.excluir);

/**
{
    "pessoa": "pessoa",
    "email": "email",
    "telefone": "telefone"
}
*/

app.get("/funcionario", funcionario.listar);
app.get("/funcionario/:idfuncionario", funcionario.selecionar);
app.post("/funcionario", funcionario.criar);
app.put("/funcionario/:idfuncionario", funcionario.alterar);
app.delete("/funcionario/:idfuncionario", funcionario.excluir);

/**
{
    "funcionario": "funcionario",
    "email": "email",
    "telefone": "telefone"
}
*/


app.listen(4000); // localhost:4000/{endpoint}