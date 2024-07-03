import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

function TituloListagem(props) {
    return (
        <>
            <Alert variant="primary">
                <Alert.Heading>{props.titulo}</Alert.Heading>
                <p>{props.subtitulo}</p>
                <hr />
                {props.url && (
                    <div className="d-flex justify-content-end">
                        <Link to={props.url} className='btn btn-primary'>Adicionar</Link>
                    </div>
                )}
            </Alert>
        </>
    );
}

export default TituloListagem;