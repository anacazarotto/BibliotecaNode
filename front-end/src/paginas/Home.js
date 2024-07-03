import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);
    const [livrosPorCategoria, setLivrosPorCategoria] = useState({});

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/livro');
                const livrosComInfoRelacionada = await Promise.all(data.map(async livro => {
                    const { data: data_editora } = await axios.get(`http://localhost:4000/editora/${livro.ideditora}`);
                    const { data: data_categoria } = await axios.get(`http://localhost:4000/categoria/${livro.idcategoria}`);
                    return {
                        ...livro,
                        editora: data_editora,
                        categoria: data_categoria
                    };
                }));
                setLivros(livrosComInfoRelacionada);

                const livrosAgrupadosPorCategoria = livrosComInfoRelacionada.reduce((acc, livro) => {
                    const categoria = livro.categoria.categoria;
                    if (!acc[categoria]) {
                        acc[categoria] = [];
                    }
                    acc[categoria].push(livro);
                    return acc;
                }, {});

                setLivrosPorCategoria(livrosAgrupadosPorCategoria);
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
            }
        };

        carregarLivros();
    }, []);

    const emprestarLivro = (livroId) => {
        navigate(`/emprestimo/${livroId}`);
    };

    const devolverLivro = async (idemprestimo, idlivro) => {
        try {
            await axios.put(`http://localhost:4000/emprestimo/${idemprestimo}`, { idlivro });
        } catch (error) {
            console.error('Erro ao devolver o livro:', error);
        }
    };

    return (
        <>
            <h1>Bem-vindo à Biblioteca</h1>
            <h2>Aqui está nosso Acervo!</h2>
            {Object.keys(livrosPorCategoria).map(categoria => (
                <div key={categoria} className="categoria-section">
                    <h3>Categoria: {categoria}</h3>
                    <div className="livros-container">
                        {livrosPorCategoria[categoria].map(livro => (
                            <div key={livro.id} className="livro-card">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{livro.titulo}</Card.Title>
                                        <Table striped bordered hover>
                                            <tbody>
                                                <tr>
                                                    <td>Editora:</td>
                                                    <td>{livro.editora ? livro.editora.editora : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Edição:</td>
                                                    <td>{livro.edicao}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ano de Publicação:</td>
                                                    <td>{livro.ano}</td>
                                                </tr>
                                                <tr>
                                                    <td>Páginas:</td>
                                                    <td>{livro.paginas}</td>
                                                </tr>
                                                <tr>
                                                    <td>Emprestados:</td>
                                                    <td>{livro.quantidade_emp}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Button onClick={() => emprestarLivro(livro.idlivro)}>Emprestar</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => devolverLivro(livro.idlivro)}>Devolver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;
