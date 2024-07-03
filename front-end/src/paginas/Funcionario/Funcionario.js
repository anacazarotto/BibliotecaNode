import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Funcionario() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/funcionario');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de funcionarios"
                subtitulo="Neste local você gerencia todos os funcionarios da biblioteca."
                url="/funcionario" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Funcionario</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/funcionario/' + d.idfuncionario}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idfuncionario}</td>
                            <td>{d.funcionario}</td>
                            <td>{d.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}