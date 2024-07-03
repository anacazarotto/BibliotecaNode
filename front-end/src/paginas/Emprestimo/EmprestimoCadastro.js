import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelecionarItem from '../../componentes/SelecionarItem';

export default function EmprestimoCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [idlivro, setIdLivro] = useState('');
    const [idpessoa, setIdPessoa] = useState('');
    const [erro, setErro] = useState(null); // Estado para armazenar mensagem de erro

    const voltar = () => {
        navigate('/emprestimos');
    }

    const salvar = async () => {
        try {
            await inserir();
        } catch (error) {
            setErro('Erro ao salvar empréstimo');
        }
    }

    const inserir = async () => {
        try {
            const json = {
                "idlivro": idlivro,
                "idpessoa": idpessoa,
            };
            await axios.post(`http://localhost:4000/emprestimo`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao inserir empréstimo');
        }
    }

    useEffect(() => {
        // Se houver um ID, então está sendo feita uma edição, precisamos buscar os detalhes do empréstimo
        if (id) {
            setIdLivro(id);
        }
    }, []);

    return (
        <>
            <h1>{(id) ? 'Alterar empréstimo' : 'Inserir empréstimo'}</h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Livro</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/livro"
                        value={idlivro}
                        name='titulo'
                        id='idlivro'
                        onChange={(e) => setIdLivro(e.target.value)}
                    />
                    <Form.Label>Pessoa</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/pessoa"
                        value={idpessoa}
                        name='pessoa'
                        id='idpessoa'
                        onChange={(e) => setIdPessoa(e.target.value)}
                    />
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

            </Form>
        </>

    );
}
