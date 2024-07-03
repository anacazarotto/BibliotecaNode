import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);

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
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
            }
        };

        carregarLivros();
    }, []);

    const emprestarLivro = (livroId) => {
        navigate(`/emprestimo/${livroId}`);
    };

    return (
        <>
            <h1>Bem-vindo à Biblioteca</h1>
            <h2>Aqui está nosso Acervo!</h2>
            <div className="livros-container">
                {livros.map(livro => (
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
                                    </tbody>
                                </Table>
                                {livro.emprestado ? (
                                    <p style={{ backgroundColor: 'blue', color: 'white' }}>Emprestado</p>
                                ) : (
                                    <Button onClick={() => emprestarLivro(livro.idlivro)}>Emprestar</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
