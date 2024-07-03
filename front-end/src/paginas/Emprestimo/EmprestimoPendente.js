import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function EmprestimoPendente() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/emprestimo-pendentes');
        const livrosComInfoRelacionada = await Promise.all(data.map(async emprestimo => {
            //const { data: data_pessoa } = await axios.get(`http://localhost:4000/pessoa/${emprestimo.idpessoa}`);
            //const { data: data_livro } = await axios.get(`http://localhost:4000/livro/${emprestimo.idlivro}`);
            return {
                ...emprestimo,
                //pessoa: data_pessoa,
                //livro: data_livro
            };
        }));
        setDados(livrosComInfoRelacionada);
    };

    useEffect(() => {
        listar();
    }, []);

    const devolverLivro = async (idemprestimo, idlivro) => {
        try {
            await axios.put(`http://localhost:4000/emprestimo/${idemprestimo}`, { idlivro });
            // Atualizar a lista após devolver o livro
            listar();
        } catch (error) {
            console.error('Erro ao devolver o livro:', error);
        }
    };

    return (
        <>
            <TituloListagem titulo="Listagem de emprestimos pendentes"
                subtitulo="Neste local você gerencia todos os emprestimos da biblioteca pendentes."
                 />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Livro</th>
                        <th>Pessoa</th>
                        <th>Emprestimo</th>
                        <th>Vencimento</th>
                        <th>Atrasado</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <button 
                                    className='btn btn-primary' 
                                    onClick={() => devolverLivro(d.idemprestimo, d.idlivro)}
                                >
                                    Devolver
                                </button>
                            </td>
                            <td>{d.idemprestimo}</td>
                            <td>{d.livro }</td>
                            <td>{d.pessoa }</td>
                            {/*<td>{d.livro ? d.livro.titulo : ''}</td>
                            <td>{d.pessoa ? d.pessoa.pessoa : ''}</td>*/}
                            <td>{d.emprestimo_data}</td>
                            <td>{d.vencimento_data}</td>
                            <td>{d.atrasado ? 'Atrasado' : 'Não atrasado'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}