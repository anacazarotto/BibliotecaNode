import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const SelecionarItem = ({ url, onChange, value, name, id }) => {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const carregarItens = async () => {
            try {
                const response = await axios.get(url);
                setItens(response.data);
            } catch (error) {
                console.error('Erro ao carregar itens:', error);
            }
        };

        carregarItens();
    }, [url]);

    return (
        <Form.Control as="select" value={value} onChange={onChange}>
            <option value="">Selecione...</option>
            {itens.map(item => (
                <option key={item[id]} value={item[id]}>
                    {item[name]}
                </option>
            ))}
        </Form.Control>
    );
};

export default SelecionarItem;
