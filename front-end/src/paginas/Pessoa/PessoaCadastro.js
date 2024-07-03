import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PessoaCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState('');

    const voltar = () => {
        navigate('/pessoas');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/pessoa/${id}`);
            setPessoa(data.pessoa);
            setEmail(data.email);
            setTelefone(data.telefone);
        } catch (error) {
            setErro('Erro ao carregar dados da pessoa.');
        }
    }

    const salvar = async () => {
        try {
            if (id) await alterar();
            else await inserir();
            voltar();
        } catch (error) {
            setErro('Erro ao salvar dados da pessoa.');
        }
    }

    const inserir = async () => {
        const json = {
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.post(`http://localhost:4000/pessoa`, json);
    }

    const alterar = async () => {
        const json = {
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.put(`http://localhost:4000/pessoa/${id}`, json);
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/pessoa/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir dados da pessoa.');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);

    return (
        <>
            <h1>{id ? 'Alterar pessoa' : 'Inserir pessoa'}</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        value={pessoa}
                        onChange={(e) => setPessoa(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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
