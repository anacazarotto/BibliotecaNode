import livro from "../model/LivroModel.js"

async function listar(req, res) {
    await livro
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await livro
        .findByPk(req.params.idlivro)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.titulo)
        res.status(500).send("Parametro titulo é obrigatório.");
    if (!req.body.ano)
        res.status(500).send("Parametro ano é obrigatório.");
    if (!req.body.emprestado === null)
        res.status(500).send("Parametro emprestado é obrigatório.");
    if (!req.body.idcategoria)
        res.status(500).send("Parametro idcategoria é obrigatório.");
    if (!req.body.ideditora)
        res.status(500).send("Parametro ideditora é obrigatório.");

    await livro
        .create({
            titulo: req.body.titulo,
            ano: req.body.ano,
            paginas: req.body.paginas || 0,
            edicao: req.body.edicao || 0,
            resumo: req.body.resumo || null,
            emprestado: req.body.emprestado,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.titulo)
        res.status(500).send("Parametro titulo é obrigatório.");
    if (!req.body.ano)
        res.status(500).send("Parametro ano é obrigatório.");
    if (!req.body.emprestado === null)
        res.status(500).send("Parametro emprestado é obrigatório.");
    if (!req.body.idcategoria)
        res.status(500).send("Parametro idcategoria é obrigatório.");
    if (!req.body.ideditora)
        res.status(500).send("Parametro ideditora é obrigatório.");

    await livro
        .update({
            titulo: req.body.titulo,
            ano: req.body.ano,
            paginas: req.body.paginas || 0,
            edicao: req.body.edicao || 0,
            resumo: req.body.resumo || null,
            emprestado: req.body.emprestado,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora,
        },
            {
                where: {
                    idlivro: req.params.idlivro
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await livro
        .destroy(
            {
                where: {
                    idlivro: req.params.idlivro
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };