import emprestimo from "../model/EmprestimoModel.js"
import livro from "../model/LivroModel.js";
import pg from "pg";

const { Client } = pg;

async function listar(req, res) {
    await emprestimo
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function listar_pendentes(req, res) {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });

    const query = `
    SELECT 
        e.idemprestimo,
        e.idlivro,
        TO_CHAR(e.emprestimo_data, 'YYYY/MM/DD') as emprestimo_data,
        TO_CHAR(e.vencimento_data, 'YYYY/MM/DD') as vencimento_data,
        l.titulo AS livro,
        p.pessoa AS pessoa,
        e.atrasado
    FROM 
        emprestimo e
    INNER JOIN 
        livro l ON e.idlivro = l.idlivro
    INNER JOIN 
        pessoa p ON e.idpessoa = p.idpessoa
    WHERE 
        e.devolucao_data IS NULL
    ORDER BY 
        e.idemprestimo DESC;
    `;

    try {
        await client.connect(); // Conecta ao banco de dados
        const resultado = await client.query(query);
        res.status(200).json(resultado.rows);
    } catch (erro) {
        res.status(500).json(erro);
    } finally {
        await client.end(); // Encerra a conexão com o banco de dados
    }
}

async function selecionar(req, res) {
    await emprestimo
        .findByPk(req.params.idemprestimo)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {

    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");

    if (!req.body.idpessoa)
        res.status(500).send("Parametro idpessoa é obrigatório.");

    // Define a data atual
    const dataAtual = new Date();
    const dataVencimento = new Date();
    dataVencimento.setMonth(dataAtual.getMonth() + 1);

    await emprestimo
        .create({
            emprestimo_data: dataAtual, // Define a data atual
            vencimento_data: dataVencimento,
            devolucao_data: req.body.devolucao_data || null,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });

    await livro.update({ emprestado: true }, {
        where: { idlivro: req.body.idlivro },
    });
}

async function alterar(req, res) {

    const dataAtual = new Date();

    await emprestimo
        .update({
            devolucao_data: dataAtual,
        },
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });

    await livro.update({ emprestado: false }, {
        where: { idlivro: req.body.idlivro },
    });
}

async function excluir(req, res) {
    await emprestimo
        .destroy(
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir, listar_pendentes };