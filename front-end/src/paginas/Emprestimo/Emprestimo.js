import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Emprestimo() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/emprestimo');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de emprestimos"
                subtitulo="Neste local você gerencia todos os emprestimos da biblioteca."
                />

            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Emprestimo</th>
                        <th>Vencimento</th>
                        <th>Devolução</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>{d.idemprestimo}</td>
                            <td>{d.emprestimo_data}</td>
                            <td>{d.vencimento_data}</td>
                            <td>{d.devolucao_data}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}