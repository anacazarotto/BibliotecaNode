import funcionario from "../model/FuncionarioModel.js"

async function listar(req, res) {
    await funcionario
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await funcionario
        .findByPk(req.params.idfuncionario)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.funcionario)
        res.status(500).send("Parametro funcionario é obrigatório.");
    if (!req.body.email)
        res.status(500).send("Parametro email é obrigatório.");
    if (!req.body.senha)
        res.status(500).send("Parametro senha é obrigatório.");

    await funcionario
        .create({
            funcionario: req.body.funcionario,
            email: req.body.email,
            senha: req.body.senha,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.funcionario)
        res.status(500).send("Parametro funcionario é obrigatório.");
    if (!req.body.email)
        res.status(500).send("Parametro email é obrigatório.");
    if (!req.body.senha)
        res.status(500).send("Parametro senha é obrigatório.");

    await funcionario
        .update({
            funcionario: req.body.funcionario,
            email: req.body.email,
            senha: req.body.senha,
        },
            {
                where: {
                    idfuncionario: req.params.idfuncionario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await funcionario
        .destroy(
            {
                where: {
                    idfuncionario: req.params.idfuncionario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };