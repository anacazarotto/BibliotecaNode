import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Livro() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/livro');
        const livrosComInfoRelacionada = await Promise.all(data.map(async livro => {
            const { data: data_editora } = await axios.get(`http://localhost:4000/editora/${livro.ideditora}`);
            const { data: data_categoria } = await axios.get(`http://localhost:4000/categoria/${livro.idcategoria}`);
            return {
                ...livro,
                editora: data_editora,
                categoria: data_categoria
            };
        }));
        setDados(livrosComInfoRelacionada);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de livros"
                subtitulo="Neste local você gerencia todos os livros da biblioteca."
                url="/livro" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>#</th>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Ano</th>
                        <th>Páginas</th>
                        <th>Resumo</th>
                        <th>Edição</th>
                        <th>Emprestado</th>
                        <th>Categoria</th>
                        <th>Editora</th>
                        <th>Emprestados</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/livro/' + d.idlivro}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>
                                <Link to={'/emprestimo/' + d.idlivro}
                                    className='btn btn-secondary'>Emprestar</Link>
                            </td>
                            <td>{d.idlivro}</td>
                            <td>{d.titulo}</td>
                            <td>{d.ano}</td>
                            <td>{d.paginas}</td>
                            <td>{d.edicao}</td>
                            <td>{d.resumo}</td>
                            <td>{d.emprestado ? 'Sim' : 'Não'}</td>
                            <td>{d.editora ? d.editora.editora : ''}</td>
                            <td>{d.categoria ? d.categoria.categoria : ''}</td>
                            <td>{d.quantidade_emp}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}