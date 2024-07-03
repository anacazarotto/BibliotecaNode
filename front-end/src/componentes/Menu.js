import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Biblioteca</Nav.Link>
                        <Nav.Link href="/emprestimos-pendentes">Empréstimos Pendentes</Nav.Link>
                        <Nav.Link href="/emprestimos">Empréstimos</Nav.Link>
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/pessoas">Pessoas</NavDropdown.Item>
                            <NavDropdown.Item href="/funcionarios">Funcionários</NavDropdown.Item>
                            <NavDropdown.Item href="/livros">Livros</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/autores">Autores</NavDropdown.Item>
                            <NavDropdown.Item href="/livroautores">Autores de livros</NavDropdown.Item>
                            <NavDropdown.Item href="/categorias">Categorias</NavDropdown.Item>
                            <NavDropdown.Item href="/editoras">Editoras</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;