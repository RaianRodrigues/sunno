# Sunno CLI

**Sunno CLI** é uma ferramenta de linha de comando desenvolvida para otimizar e agilizar o desenvolvimento de aplicações React.js. Ela oferece funcionalidades práticas, como listar projetos de uma pasta e criar componentes e páginas de maneira automatizada, economizando tempo e esforço durante o desenvolvimento.

---

## 🚀 Funcionalidades

A **Sunno CLI** oferece as seguintes funcionalidades:

### 1. **Listar Projetos**
Comando: `list-projects`  
Exibe uma lista de projetos a partir de um diretório especificado e permite abrir o projeto diretamente na IDE configurada (como `VS Code`).

### 2. **Criar Componentes**
Comando: `create-component <nome-do-componente>`  
Cria um novo componente React dentro do diretório `src/components/`, seguindo a estrutura e convenções preestabelecidas.

### 3. **Criar Páginas**
Comando: `create-page <nome-da-página>`  
Cria uma nova página React dentro do diretório `src/pages/` e automaticamente adiciona a exportação dessa página ao arquivo `index.ts` para facilitar o uso.

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/sunno-cli.git
```

### 2. Instale globalmente

```bash
npm install -g .
```

## 🔧 Configuração

Antes de utilizar os comandos, você precisa configurar o caminho do diretório de projetos e o comando para abrir a sua IDE (por exemplo, code . para o VS Code).

## 🖥️ Exemplos de Uso

### 1. Listar Projetos
Use este comando para listar os projetos disponíveis na pasta especificada:
```bash
sunno list-projects
```

### 2. Criar um Componente
Para criar um novo componente React, use:
```bash
sunno create-component ['COMPONENTE_NAME']
```
Ex: 
```bash
sunno create-component Button
```
Isso criará o componente Button na pasta src/components/Button/ com a estrutura básica.

### 3. Criar uma Página
Para criar uma nova página React, use:
```bash
sunno create-component ['PAGE_NAME']
```
Ex:
```bash
sunno create-page Home
```
Isso criará a página Home na pasta src/pages/Home/ com a estrutura básica.

### 📄 Licença
Este projeto é licenciado sob a MIT License
