import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelecionarItem from '../../componentes/SelecionarItem';

export default function LivroCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [edicao, setEdicao] = useState('');
    const [resumo, setResumo] = useState('');
    const [emprestado, setEmprestado] = useState(false);
    const [idcategoria, setIdCategoria] = useState('');
    const [ideditora, setIdEditora] = useState('');
    const [erro, setErro] = useState('');

    const voltar = () => {
        navigate('/livros');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
            setTitulo(data.titulo);
            setAno(data.ano);
            setPaginas(data.paginas);
            setEdicao(data.edicao);
            setResumo(data.resumo);
            setEmprestado(data.emprestado);
            setIdCategoria(data.idcategoria);
            setIdEditora(data.ideditora);
        } catch (error) {
            setErro('Erro ao carregar livro.');
        }
    }

    const salvar = async () => {
        try {
            if (id) await alterar();
            else await inserir();
            voltar();
        } catch (error) {
            setErro('Erro ao salvar livro.');
        }
    }

    const inserir = async () => {
        const json = {
            titulo,
            ano,
            paginas,
            edicao,
            resumo,
            emprestado,
            idcategoria,
            ideditora,
        };
        await axios.post(`http://localhost:4000/livro`, json);
    }

    const alterar = async () => {
        const json = {
            titulo,
            ano,
            paginas,
            edicao,
            resumo,
            emprestado,
            idcategoria,
            ideditora,
        };
        await axios.put(`http://localhost:4000/livro/${id}`, json);
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/livro/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir livro.');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);

    return (
        <>
            <h1>{id ? 'Alterar Livro' : 'Inserir Livro'}</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} />
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="number"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)} />
                    <Form.Label>Páginas</Form.Label>
                    <Form.Control type="number"
                        value={paginas}
                        onChange={(e) => setPaginas(e.target.value)} />
                    <Form.Label>Edição</Form.Label>
                    <Form.Control type="number"
                        value={edicao}
                        onChange={(e) => setEdicao(e.target.value)} />
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control type="text"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)} 
                        as="textarea" rows={3} 
                        />
                    <Form.Label>Emprestado</Form.Label>
                    <Form.Check
                        type="checkbox"
                        id="checkbox"
                        label="Sim"
                        checked={emprestado}
                        onChange={(e) => setEmprestado(e.target.checked)}
                    />
                    <Form.Label>Categoria</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/categoria"
                        value={idcategoria}
                        name='categoria'
                        id='idcategoria'
                        onChange={(e) => setIdCategoria(e.target.value)}
                    />

                    <Form.Label>Editora</Form.Label>
                    <SelecionarItem
                        url="http://localhost:4000/editora"
                        value={ideditora}
                        name='editora'
                        id='ideditora'
                        onChange={(e) => setIdEditora(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={salvar}>
                    Salvar
                </Button>
                <Button variant="secondary" onClick={voltar}>
                    Cancelar
                </Button>
                <Button variant="danger" type="button" hidden={!id}
                    onClick={() => excluir()}>
                    Excluir
                </Button>
                {erro && <p className="text-danger">{erro}</p>}
            </Form>
        </>
    );
}
