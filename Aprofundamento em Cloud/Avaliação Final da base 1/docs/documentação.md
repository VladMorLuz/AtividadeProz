Documentação do Projeto
Diagrama de Banco de Dados
O banco de dados é composto por duas tabelas: users e profiles, com a seguinte estrutura:

users:

id: Chave primária, inteiro, auto-incremento.
username: Texto (255), obrigatório, único.
password: Texto (255), obrigatório (hash da senha).
email: Texto (255), obrigatório, único.
telefone: Texto (100), opcional.
created_at: Data/hora, padrão CURRENT_TIMESTAMP.


profiles:

user_id: Chave primária e estrangeira, inteiro, referencia users(id).
data_nascimento: Data, opcional.
foto_perfil: Texto (255), opcional.



Fluxo de Informações:

No cadastro, os dados do formulário são enviados ao backend via POST /register.
O backend insere os dados em users e, após obter o id, insere em profiles.
No login, o backend verifica o username e compara a senha com o hash armazenado.

Diagrama de Classes

Classe User:

Atributos: id, username, password, email, telefone, created_at.
Métodos: register(), login().


Classe Profile:

Atributos: user_id, data_nascimento, foto_perfil.
Métodos: createProfile().



Relacionamentos:

User tem um relacionamento 1:1 com Profile via user_id.

Manual do Usuário
Cadastro

Acesse a página inicial.
Preencha o formulário de cadastro com:
Usuário, senha, email (obrigatórios).
Telefone, data de nascimento, URL da foto de perfil (opcionais).


Clique em "Cadastrar".
Uma mensagem confirmará o sucesso ou indicará erros.

Login

Clique em "Fazer Login" na página inicial.
Insira usuário e senha.
Clique em "Entrar".
Uma mensagem confirmará o login ou indicará erros.
