import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Autor() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/autor');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de autores"
                subtitulo="Neste local você gerencia todos os autores da biblioteca."
                url="/autor" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/autor/' + d.idautor}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idautor}</td>
                            <td>{d.autor}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}