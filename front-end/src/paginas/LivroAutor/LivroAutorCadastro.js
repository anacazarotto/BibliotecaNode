import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelecionarItem from '../../componentes/SelecionarItem';

export default function LivroAutorCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [idlivro, setLivro] = useState('');
    const [idautor, setAutor] = useState('');
    const [erro, setErro] = useState('');

    const voltar = () => {
        navigate('/livroautores');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/livroautor/${id}`);
            setLivro(data.idlivro);
            setAutor(data.idautor);
        } catch (error) {
            setErro('Erro ao carregar associação livro-autor.');
        }
    }

    const salvar = async () => {
        try {
            if (id) await alterar();
            else await inserir();
            voltar();
        } catch (error) {
            setErro('Erro ao salvar associação livro-autor.');
        }
    }

    const inserir = async () => {
        const json = {
            "idlivro": idlivro,
            "idautor": idautor
        };
        await axios.post(`http://localhost:4000/livroautor`, json);
    }

    const alterar = async () => {
        const json = {
            "idlivro": idlivro,
            "idautor": idautor
        };
        await axios.put(`http://localhost:4000/livroautor/${id}`, json);
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/livroautor/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir associação livro-autor.');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);

    return (
        <>
            <h1>{id ? 'Alterar associação livro-autor' : 'Inserir associação livro-autor'}</h1>
            <Form>
                <Form.Group className="mb-3">

                <Form.Label>Livro</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/livro"
                        value={idlivro}
                        name='titulo'
                        id='idlivro'
                        onChange={(e) => setLivro(e.target.value)}
                    />

                    <Form.Label>Autor</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/autor"
                        value={idautor}
                        name='autor'
                        id='idautor'
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={salvar}>
                    Salvar
                </Button>
                <Button variant="secondary" onClick={voltar}>
                    Cancelar
                </Button>
                {id && (
                    <Button variant="danger" onClick={excluir}>
                        Excluir
                    </Button>
                )}
                {erro && <p className="text-danger">{erro}</p>}
            </Form>
        </>
    );
}
