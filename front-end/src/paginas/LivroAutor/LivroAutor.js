import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LivroAutor() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/livroautor');
        const livrosComInfoRelacionada = await Promise.all(data.map(async livro => {
            const { data: data_livro } = await axios.get(`http://localhost:4000/livro/${livro.idlivro}`);
            const { data: data_autor } = await axios.get(`http://localhost:4000/autor/${livro.idautor}`);
            return {
                ...livro,
                livro: data_livro,
                autor: data_autor
            };
        }));
        setDados(livrosComInfoRelacionada);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de autores de livros"
                subtitulo="Neste local você gerencia todos os autores de livros da biblioteca."
                url="/livroautor" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Livro</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/livroautor/' + d.idlivroautor}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idlivroautor}</td>
                            <td>{d.livro ? d.livro.titulo : ''}</td>
                            <td>{d.autor ? d.autor.autor : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}