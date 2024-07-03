import livroautor from "../model/LivroAutorModel.js"

async function listar(req, res) {
    await livroautor
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await livroautor
        .findByPk(req.params.idlivroautor)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");
    if (!req.body.idautor)
        res.status(500).send("Parametro idautor é obrigatório.");

    await livroautor
        .create({
            idlivro: req.body.idlivro,
            idautor: req.body.idautor,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");
    if (!req.body.idautor)
        res.status(500).send("Parametro idautor é obrigatório.");


    await livroautor
        .update({
            idlivro: req.body.idlivro,
            idautor: req.body.idautor,
        },
            {
                where: {
                    idlivroautor: req.params.idlivroautor
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await livroautor
        .destroy(
            {
                where: {
                    idlivroautor: req.params.idlivroautor
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };