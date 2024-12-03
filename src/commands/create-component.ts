import { GluegunCommand, GluegunFilesystem } from "gluegun";

const updateBarrelExport = ({
    componentName,
    fs,
}: {
    componentName: string;
    fs: GluegunFilesystem;
}) => {
    const barrelPath = fs.path(fs.cwd(), "src/components", "index.ts");
    const exportLine = `export * from './${componentName}';\n`;

    if (fs.exists(barrelPath)) {
        const barrelContent = fs.read(barrelPath, "utf8");
        if (!barrelContent.includes(exportLine)) {
            fs.append(barrelPath, exportLine);
        }
    } else {
        fs.write(barrelPath, exportLine);
    }
};

const command: GluegunCommand = {
    name: "create-component",
    description: "Cria componentes ReactJs",
    run: async ({
        print: { success, error },
        parameters: { first: name },
        template: { generate },
        filesystem,
    }) => {
        if (!name) {
            error("O nome do componente é obrigatório!");
            return;
        }

        const formattedName = name[0].toUpperCase() + name.slice(1);

        try {

            await generate({
                template: "template.tsx.ejs",
                target: `src/components/${formattedName}/index.tsx`,
                props: { name: formattedName },
            });

            updateBarrelExport({
                componentName: formattedName,
                fs: filesystem,
            });

            success(`Componente ${formattedName} criado com sucesso!`);
        } catch (err) {
            error(`Erro ao criar o componente: ${(err as Error).message}`);
        }
    },
};

module.exports = command;
