import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoriaCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState('');
    const [erro, setErro] = useState(null); // Estado para armazenar mensagem de erro

    const voltar = () => {
        navigate('/categorias');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/categoria/${id}`);
            setCategoria(data.categoria);
        } catch (error) {
            setErro('Erro ao carregar categoria');
        }
    }

    const salvar = async () => {
        try {
            if (id)
                await alterar();
            else
                await inserir();
        } catch (error) {
            setErro('Erro ao salvar categoria');
        }
    }

    const inserir = async () => {
        try {
            const json = { "categoria": categoria };
            await axios.post(`http://localhost:4000/categoria`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao inserir categoria');
        }
    }

    const alterar = async () => {
        try {
            const json = { "categoria": categoria };
            await axios.put(`http://localhost:4000/categoria/${id}`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao alterar categoria');
        }
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/categoria/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir categoria');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);


    return (
        <>
            <h1>{(id) ? 'Alterar categoria' : 'Inserir categoria'}</h1>

            <h2>{categoria}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome da categoria</Form.Label>
                    <Form.Control type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)} />
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
