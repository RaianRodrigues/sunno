<h1 align="center"> Sunno CLI </h1>

**Sunno CLI** is a command-line tool developed to optimize and streamline the development of React.js applications. It offers practical features such as listing projects from a folder and creating components and pages in an automated way, saving time and effort during development.

> [!IMPORTANT]
> The Sunno CLI adopts the [Barrel export](https://basarat.gitbook.io/typescript/main-1/barrel) methodology, which involves centralizing all exports in a single file.
> This approach reduces the number of `imports` required in the code, making it cleaner and more organized.

<h2 align="center"> 🚀 Features </h2>

**Sunno CLI** offers the following features:

### 1. **List Projects**

Command: `list-projects`  
Displays a list of projects from a specified directory and allows opening the project directly in the configured IDE (like `VS Code`).

### 2. **Create Components**

Command: `create-component <component-name>`  
Creates a new React component inside the `src/components/` directory, following the established structure and conventions.

### 3. **Create Pages**

Command: `create-page <page-name>`  
Creates a new React page inside the `src/pages/` directory and automatically adds the export of this page to the `index.ts` file for easy usage.

<h2 align="center"> ⚙️ Installation </h2>
To install the CLI, run the following command:

```bash
npm install -g sunno
```

<h2 align="center"> 🖥️ Usage Examples </h2>

### 1. List Projects

Use this command to list the projects available in the specified folder:

```bash
sunno list-projects
```

During setup, you will receive the following prompts:

```bash
# ? Enter the path to your projects folder:
# ? What command do you use to open your IDE? (Example: "code .")
```

> [!TIP] You can use the --set-path and --set-ide flags to reset the projects directory path or
> update the command used to open the projects in your preferred IDE.

### 2. Create a Component

To create a new React component, use:

```bash
sunno create-component ['COMPONENT_NAME']

# Ex: sunno create-component Button
# This will create the Button component in the src/components/Button/ folder with the basic structure.
```

### 3. Create a Page

To create a new React page, use:

```bash
sunno create-component ['PAGE_NAME']

# Ex: sunno create-page Home
# This will create the Home page in the src/pages/Home/ folder with the basic structure.

```
### 4. Delete a Component

To delete a component, use:

```bash
sunno delete-componente

# This will list the components available in `src/components` for you to choose from.
```

### 5. Delete a Page

To delete a page, use:

```bash
sunno delete-page

# This will list the pages available in `src/pages` for you to choose from.
```

> [!TIP]
> Both `delete-component` and `delete-page` automatically remove the
> corresponding export from index.ts, so there's no need to do it manually

### 📄 License

This project is licensed under the [MIT License](https://github.com/RaianRodrigues/sunno/blob/main/LICENSE)
