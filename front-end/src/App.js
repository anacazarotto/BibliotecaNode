
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './paginas/Home';

import Autor from './paginas/Autor/Autor';
import AutorCadastro from './paginas/Autor/AutorCadastro';

import Categoria from './paginas/Categoria/Categoria';
import CategoriaCadastro from './paginas/Categoria/CategoriaCadastro';

import Editora from './paginas/Editora/Editora';
import EditoraCadastro from './paginas/Editora/EditoraCadastro';

import Emprestimo from './paginas/Emprestimo/Emprestimo';
import EmprestimoCadastro from './paginas/Emprestimo/EmprestimoCadastro';

import Livro from './paginas/Livro/Livro';
import LivroCadastro from './paginas/Livro/LivroCadastro';

import LivroAutor from './paginas/LivroAutor/LivroAutor';
import LivroAutorCadastro from './paginas/LivroAutor/LivroAutorCadastro';

import Pessoa from './paginas/Pessoa/Pessoa';
import PessoaCadastro from './paginas/Pessoa/PessoaCadastro';

import Funcionario from './paginas/Funcionario/Funcionario';
import FuncionarioCadastro from './paginas/Funcionario/FuncionarioCadastro';
import EmprestimoPendente from './paginas/Emprestimo/EmprestimoPendente';

function App() {
  return (
    <div>
      <Menu />
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/' element={<Home />} />

            <Route path='/autores' element={<Autor />} />
            <Route path='/autor' element={<AutorCadastro />} />
            <Route path='/autor/:id' element={<AutorCadastro />} />

            <Route path='/categorias' element={<Categoria />} />
            <Route path='/categoria' element={<CategoriaCadastro />} />
            <Route path='/categoria/:id' element={<CategoriaCadastro />} />

            <Route path='/editoras' element={<Editora />} />
            <Route path='/editora' element={<EditoraCadastro />} />
            <Route path='/editora/:id' element={<EditoraCadastro />} />

            <Route path='/emprestimos' element={<Emprestimo />} />
            <Route path='/emprestimos-pendentes' element={<EmprestimoPendente />} />
            <Route path='/emprestimo' element={<EmprestimoCadastro />} />
            <Route path='/emprestimo/:id' element={<EmprestimoCadastro />} />

            <Route path='/livros' element={<Livro />} />
            <Route path='/livro' element={<LivroCadastro />} />
            <Route path='/livro/:id' element={<LivroCadastro />} />

            <Route path='/livroautores' element={<LivroAutor />} />
            <Route path='/livroautor' element={<LivroAutorCadastro />} />
            <Route path='/livroautor/:id' element={<LivroAutorCadastro />} />

            <Route path='/pessoas' element={<Pessoa />} />
            <Route path='/pessoa' element={<PessoaCadastro />} />
            <Route path='/pessoa/:id' element={<PessoaCadastro />} />

            <Route path='/funcionarios' element={<Funcionario />} />
            <Route path='/funcionario' element={<FuncionarioCadastro />} />
            <Route path='/funcionario/:id' element={<FuncionarioCadastro />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;