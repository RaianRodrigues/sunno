import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { AuxProps } from "../types/config";
import { updateBarrelExport } from "../utils/actions/updateBarrelExport";
import { isReact } from "../utils/isReact";

module.exports = (toolbox: Toolbox) => {

    const { filesystem, template: { generate }, print: { success, error } } = toolbox;

    async function Aux({ folder, name }: AuxProps) {

        if (!name) {
            error("O nome do componente é obrigatório!");
            return;
        }

        const formattedName = name[0].toUpperCase() + name.slice(1);

        try {
            await isReact(filesystem);

            await generate({
                template: "template.tsx.ejs",
                target: filesystem.path(folder, formattedName, 'index.tsx'),
                props: { name: formattedName },
            });

            updateBarrelExport({
                componentName: formattedName,
                barrelPath: filesystem.path(folder, 'index.ts'),
                fs: filesystem
            });

            success(`Componente ${formattedName} criado com sucesso!`);
        } catch (err) {
            error(`Erro ao criar o componente: ${(err as Error).message}`);
        }
    }
    toolbox.Aux = Aux;
};
