import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditoraCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editora, setEditora] = useState('');
    const [erro, setErro] = useState(null); // Estado para armazenar mensagem de erro

    const voltar = () => {
        navigate('/editoras');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/editora/${id}`);
            setEditora(data.editora);
        } catch (error) {
            setErro('Erro ao carregar editora');
        }
    }

    const salvar = async () => {
        try {
            if (id)
                await alterar();
            else
                await inserir();
        } catch (error) {
            setErro('Erro ao salvar editora');
        }
    }

    const inserir = async () => {
        try {
            const json = { "editora": editora };
            await axios.post(`http://localhost:4000/editora`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao inserir editora');
        }
    }

    const alterar = async () => {
        try {
            const json = { "editora": editora };
            await axios.put(`http://localhost:4000/editora/${id}`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao alterar editora');
        }
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/editora/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir editora');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);


    return (
        <>
            <h1>{(id) ? 'Alterar editora' : 'Inserir editora'}</h1>

            <h2>{editora}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome da editora</Form.Label>
                    <Form.Control type="text"
                        value={editora}
                        onChange={(e) => setEditora(e.target.value)} />
                </Form.Group>

                {/* Exibindo mensagem de erro */}
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
