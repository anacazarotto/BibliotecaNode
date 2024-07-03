import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Emprestimo() {
    const [dados, setDados] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/emprestimo');
        const livrosComInfoRelacionada = await Promise.all(data.map(async emprestimo => {
            const { data: data_pessoa } = await axios.get(`http://localhost:4000/pessoa/${emprestimo.idpessoa}`);
            const { data: data_livro } = await axios.get(`http://localhost:4000/livro/${emprestimo.idlivro}`);
            return {
                ...emprestimo,
                pessoa: data_pessoa,
                livro: data_livro
            };
        }));
        setDados(livrosComInfoRelacionada);
        setDadosFiltrados(livrosComInfoRelacionada); // Inicialmente, os dados filtrados são os mesmos que os dados completos
    };

    useEffect(() => {
        listar();
    }, []);

    useEffect(() => {
        if (filtro.trim() === '') {
            setDadosFiltrados(dados); // Se o filtro estiver vazio, mostrar todos os dados
        } else {
            const filtrados = dados.filter(d => d.pessoa && d.pessoa.pessoa.toLowerCase().includes(filtro.toLowerCase()));
            setDadosFiltrados(filtrados);
        }
    }, [filtro, dados]);

    return (
        <>
            <TituloListagem titulo="Listagem de empréstimos"
                subtitulo="Neste local você gerencia todos os empréstimos da biblioteca."
            />

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por pessoa..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empréstimo</th>
                        <th>Vencimento</th>
                        <th>Devolução</th>
                        <th>Pessoa</th>
                        <th>Livro</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosFiltrados.map((d, i) => (
                        <tr key={i}>
                            <td>{d.idemprestimo}</td>
                            <td>{d.emprestimo_data}</td>
                            <td>{d.vencimento_data}</td>
                            <td>{d.devolucao_data}</td>
                            <td>{d.pessoa ? d.pessoa.pessoa : ''}</td>
                            <td>{d.livro ? d.livro.titulo : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
