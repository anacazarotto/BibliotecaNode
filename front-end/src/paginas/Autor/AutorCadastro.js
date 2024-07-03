import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AutorCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [autor, setAutor] = useState('');
    const [erro, setErro] = useState(null);

    const voltar = () => {
        navigate('/autores');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/autor/${id}`);
            setAutor(data.autor);
        } catch (error) {
            setErro(error.message);
        }
    }

    const salvar = async () => {
        try {
            if (id)
                await alterar();
            else
                await inserir();
        } catch (error) {
            setErro(error.message);
        }
    }

    const inserir = async () => {
        try {
            const json = { "autor": autor };
            await axios.post(`http://localhost:4000/autor`, json);
            voltar();
        } catch (error) {
            setErro(error.message);
        }
    }

    const alterar = async () => {
        try {
            const json = { "autor": autor };
            await axios.put(`http://localhost:4000/autor/${id}`, json);
            voltar();
        } catch (error) {
            setErro(error.message);
        }
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/autor/${id}`);
                voltar();
            } catch (error) {
                setErro(error.message);
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);

    return (
        <>
            <h1>{(id) ? 'Alterar autor' : 'Inserir autor'}</h1>

            <h2>{autor}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome do autor</Form.Label>
                    <Form.Control type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)} />
                </Form.Group>

                {erro && <p>{erro}</p>}

                <Button variant="primary" type="button"
                    onClick={() => salvar()}>
                    Salvar
                </Button>

                <Button variant="secondary" type="button"
                    onClick={() => voltar()}>
                    Cancelar
                </Button>

                <Button variant="danger" type="button" hidden={!id}
                    onClick={() => excluir()}>
                    Excluir
                </Button>
            </Form>
        </>
    );
}
