create table pessoa(
  idpessoa bigserial not null, 
  pessoa varchar(40) not null,
  email varchar(40) not null, 
  telefone varchar(15) not null,	
  constraint pk_pessoa primary key (idpessoa)	
);

create table autor(
  idautor bigserial not null, 
  autor varchar(40) not null,
  constraint pk_autor primary key (idautor)	
);

create table editora(
  ideditora bigserial not null, 
  editora varchar(40) not null,
  constraint pk_editora primary key (ideditora)	
);

create table categoria(
  idcategoria bigserial not null, 
  categoria varchar(40) not null,
  constraint pk_categoria primary key (idcategoria)	
);

create table livro(
  idlivro bigserial not null, 
  titulo varchar(40) not null,
  ano integer not null,
  paginas integer not null,
  edicao integer not null,
  quantidade_emp integer not null default 0,
  resumo text null,
  emprestado boolean default false,
  idcategoria bigint not null,
  ideditora bigint not null,	
  constraint pk_livro primary key (idlivro),
  constraint fk_livro_categoria foreign key (idcategoria) references categoria(idcategoria),
  constraint fk_livro_editora foreign key (ideditora) references editora(ideditora)	
);

create table livroautor(
  idlivroautor bigserial not null, 
  idlivro bigint not null,
  idautor bigint not null,	
  constraint pk_livroautor primary key (idlivroautor),
  constraint fk_livroautor_livro foreign key (idlivro) references livro(idlivro),
  constraint fk_livroautor_autor foreign key (idautor) references autor(idautor)	
);


create table emprestimo(
  idemprestimo bigserial not null, 
  idlivro bigint not null,
  idpessoa bigint not null,	
  emprestimo date not null default current_date,
  vencimento date not null,
  devolucao date null,	
  atrasado BOOLEAN NOT NULL DEFAULT FALSE,
  constraint pk_emprestimo primary key (idemprestimo),
  constraint fk_emprestimo_livro foreign key (idlivro) references livro(idlivro),
  constraint fk_emprestimo_pessoa foreign key (idpessoa) references pessoa(idpessoa)	
);

CREATE OR REPLACE PROCEDURE marcar_emprestimos_em_atraso()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE emprestimo
    SET atrasado = TRUE
    WHERE devolucao_data IS NULL
    AND vencimento_data < current_date;
END;
$$;

CREATE OR REPLACE FUNCTION atualizar_quantidade_livro()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza a quantidade_emp quando um novo empréstimo é inserido
  IF TG_OP = 'INSERT' THEN
    UPDATE livro
    SET quantidade_emp = quantidade_emp + 1
    WHERE idlivro = NEW.idlivro;
  
  -- Atualiza a quantidade_emp quando um empréstimo é marcado como devolvido
  ELSIF TG_OP = 'UPDATE' AND NEW.devolucao_data IS NOT NULL AND OLD.devolucao_data IS NULL THEN
    UPDATE livro
    SET quantidade_emp = quantidade_emp - 1
    WHERE idlivro = NEW.idlivro;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_atualizar_quantidade_livro_insert
AFTER INSERT ON emprestimo
FOR EACH ROW
WHEN (NEW.devolucao_data IS NULL)
EXECUTE FUNCTION atualizar_quantidade_livro();

CREATE TRIGGER trigger_atualizar_quantidade_livro_update
AFTER UPDATE ON emprestimo
FOR EACH ROW
WHEN (NEW.devolucao_data IS NOT NULL OR OLD.devolucao_data IS NULL)
EXECUTE FUNCTION atualizar_quantidade_livro();
