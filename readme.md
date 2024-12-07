<h3 align="right"> <a href="https://github.com/RaianRodrigues/sunno/blob/main/docs/en-US.md">English</a>
  
<h1 align="center"> Sunno CLI </h1>

**Sunno CLI** é uma ferramenta de linha de comando desenvolvida para otimizar e agilizar o desenvolvimento de aplicações React.js. Ela oferece funcionalidades práticas, como listar projetos de uma pasta e criar componentes e páginas de maneira automatizada, economizando tempo e esforço durante o desenvolvimento.

> [!IMPORTANT]
> A Sunno CLI adota a metodologia de [Barrel export](https://basarat.gitbook.io/typescript/main-1/barrel), que consiste em centralizar todas as exportações em um único arquivo.
> Essa abordagem reduz a quantidade de `imports` necessários no código, tornando-o mais limpo e organizado.

<h2 align="center"> 🚀 Funcionalidades </h2>

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

<h2 align="center"> ⚙️ Instalação </h2>
Para instalar a cli executo o seguinte comando:

```bash
npm install -g sunno
```

<h2 align="center"> 🖥️ Exemplos de Uso </h2>

### 1. Listar Projetos

Use este comando para listar os projetos disponíveis na pasta especificada:

```bash
sunno list-projects
```

Durante a configuração, você receberá os seguintes prompts:

```bash
# ? Enter the path to your projects folder:
# ? What command do you use to open your IDE? (Example: "code .")
```

> [!TIP]
> Você pode usar as flags `--set-path` e `--set-ide` para redefinir o caminho do diretório de
> projetos ou atualizar o comando utilizado para abrir os projetos na sua IDE preferida.

### 2. Criar um Componente

Para criar um novo componente React, use:

```bash
sunno create-component ['COMPONENTE_NAME']

# Ex: sunno create-component Button
# Isso criará o componente Button na pasta src/components/Button/ com a estrutura básica.
```

### 3. Criar uma Página

Para criar uma nova página React, use:

```bash
sunno create-page ['PAGE_NAME']

# Ex: sunno create-page Home
# Isso criará a página Home na pasta src/pages/Home/ com a estrutura básica.
```

### 4. Deletar um Componente

Para deletar um componente, use:

```bash
sunno delete-componente

# Isso listará os componentes diponíveis em `src/components`para que você escolha.
```

### 5. Deletar uma Página

Para deletar uma página, use:

```bash
sunno delete-page

# Isso listará as páginas diponíveis em `src/pages`para que você escolha.
```

> [!TIP]
> Em ambos os casos tanto o `delete-component` quanto o `delete-page` irão automaticamente remover a exportação correspondente do
>`index.ts`, logo não é necessário removê-la manualmente

### 📄 Licença

Este projeto é licenciado sob a [MIT License](https://github.com/RaianRodrigues/sunno/blob/main/LICENSE)
