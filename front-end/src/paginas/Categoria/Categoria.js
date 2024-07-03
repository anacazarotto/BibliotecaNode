import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categoria() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/categoria');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de categorias"
                subtitulo="Neste local você gerencia todas as categorias de livros da biblioteca."
                url="/categoria" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/categoria/' + d.idcategoria}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idcategoria}</td>
                            <td>{d.categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}