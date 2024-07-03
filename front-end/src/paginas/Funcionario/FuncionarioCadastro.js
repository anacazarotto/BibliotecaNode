import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function FuncionarioCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [funcionario, setFuncionario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const voltar = () => {
        navigate('/funcionarios');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/funcionario/${id}`);
            setFuncionario(data.funcionario);
            setEmail(data.email);
            setSenha(data.senha);
        } catch (error) {
            setErro('Erro ao carregar dados da funcionario.');
        }
    }

    const salvar = async () => {
        try {
            if (id) await alterar();
            else await inserir();
            voltar();
        } catch (error) {
            setErro('Erro ao salvar dados da funcionario.');
        }
    }

    const inserir = async () => {
        const json = {
            "funcionario": funcionario,
            "email": email,
            "senha": senha
        };
        await axios.post(`http://localhost:4000/funcionario`, json);
    }

    const alterar = async () => {
        const json = {
            "funcionario": funcionario,
            "email": email,
            "senha": senha
        };
        await axios.put(`http://localhost:4000/funcionario/${id}`, json);
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/funcionario/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir dados da funcionario.');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);

    return (
        <>
            <h1>{id ? 'Alterar funcionario' : 'Inserir funcionario'}</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        value={funcionario}
                        onChange={(e) => setFuncionario(e.target.value)}
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
                <Form.Group className="mb-3" hidden={id}>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
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
