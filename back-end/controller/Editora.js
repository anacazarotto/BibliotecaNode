import editora from "../model/EditoraModel.js"

async function listar(req, res) {
    await editora
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await editora
        .findByPk(req.params.ideditora)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.editora)
        res.status(500).send("Parametro editora é obrigatório.");

    await editora
        .create({
            editora: req.body.editora
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.editora)
        res.status(500).send("Parametro editora é obrigatório.");

    await editora
        .update({
            editora: req.body.editora
        },
            {
                where: {
                    ideditora: req.params.ideditora
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await editora
        .destroy(
            {
                where: {
                    ideditora: req.params.ideditora
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };