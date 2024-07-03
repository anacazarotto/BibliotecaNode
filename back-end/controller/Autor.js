import autor from "../model/AutorModel.js"

async function listar(req, res) {
    await autor
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await autor
        .findByPk(req.params.idautor)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.autor)
        res.status(500).send("Parametro autor é obrigatório.");

    await autor
        .create({
            autor: req.body.autor
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.autor)
        res.status(500).send("Parametro autor é obrigatório.");

    await autor
        .update({
            autor: req.body.autor
        },
            {
                where: {
                    idautor: req.params.idautor
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await autor
        .destroy(
            {
                where: {
                    idautor: req.params.idautor
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };