import { GluegunCommand, GluegunFilesystem } from "gluegun";

const updateBarrelExport = ({
    componentName,
    fs,
}: {
    componentName: string;
    fs: GluegunFilesystem;
}) => {
    const barrelPath = fs.path("src/pages", "index.ts");
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
    name: "create-page",
    description: "Cria páginas ReactJs",
    run: async ({
        print: { success, error },
        parameters: { first: name },
        template: { generate },
        filesystem,
    }) => {
        if (!name) {
            error("O nome da página é obrigatório!");
            return;
        }

        const formattedName = name[0].toUpperCase() + name.slice(1);

        try {

            await generate({
                template: "template.tsx.ejs",
                target: `src/pages/${formattedName}/index.tsx`,
                props: { name: formattedName },
            });

            updateBarrelExport({
                componentName: formattedName,
                fs: filesystem,
            });

            success(`Página ${formattedName} criada com sucesso!`);
        } catch (err) {
            error(`Erro ao criar a página: ${(err as Error).message}`);
        }
    },
};

module.exports = command;
