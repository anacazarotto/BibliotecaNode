import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Editora() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/editora');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de editoras"
                subtitulo="Neste local você gerencia todos os editoras da biblioteca."
                url="/editora" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Editora</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/editora/' + d.ideditora}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.ideditora}</td>
                            <td>{d.editora}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}