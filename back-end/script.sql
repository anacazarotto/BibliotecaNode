create database biblioteca;

create table pessoa(
  idpessoa bigserial not null, 
  pessoa varchar(40) not null,
  email varchar(40) not null, 
  telefone varchar(15) not null,	
  constraint pk_pessoa primary key (idpessoa)	
);

create table funcionario(
  idfuncionario bigserial not null, 
  funcionario varchar(40) not null,
  email varchar(40) not null, 
  senha varchar(15) not null,	
  constraint pk_funcionario primary key (idfuncionario)	
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
  emprestimo_data date not null default current_date,
  vencimento_data date not null,
  devolucao_data date null,	
  constraint pk_emprestimo primary key (idemprestimo),
  constraint fk_emprestimo_livro foreign key (idlivro) references livro(idlivro),
  constraint fk_emprestimo_pessoa foreign key (idpessoa) references pessoa(idpessoa)	
);

--- foi adicionada tabela funcionarios