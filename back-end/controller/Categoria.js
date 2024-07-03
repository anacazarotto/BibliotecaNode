import categoria from "../model/CategoriaModel.js"

async function listar(req, res) {
    await categoria
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await categoria
        .findByPk(req.params.idcategoria)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.categoria)
        res.status(500).send("Parametro categoria é obrigatório.");

    await categoria
        .create({
            categoria: req.body.categoria
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.categoria)
        res.status(500).send("Parametro categoria é obrigatório.");

    await categoria
        .update({
            categoria: req.body.categoria
        },
            {
                where: {
                    idcategoria: req.params.idcategoria
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await categoria
        .destroy(
            {
                where: {
                    idcategoria: req.params.idcategoria
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };