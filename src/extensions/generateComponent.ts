import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { generateComponentProps } from "../types/config";
import { updateBarrelExport } from "../utils/actions/updateBarrelExport";
import { isReact } from "../utils/isReact";

module.exports = (toolbox: Toolbox) => {

    const { filesystem, template: { generate }, print: { success, error } } = toolbox;

    async function generateComponent({ folder, name }: generateComponentProps) {

        if (!name) {
            error("The component name is required!");
            return;
        }

        const formattedName = name[0].toUpperCase() + name.slice(1);

        try {
            await isReact(filesystem);

            await generate({
                template: "template.tsx.ejs",
                target: `${folder}/${formattedName}/index.tsx`,
                props: { name: formattedName },
            });

            updateBarrelExport({
                componentName: formattedName,
                barrelPath: filesystem.path(folder, 'index.ts'),
                fs: filesystem
            });

            success(`Component ${formattedName} created successfully!`);
        } catch (err) {
            error(`Error creating component: ${(err as Error).message}`);
        }
    }
    toolbox.generateComponent = generateComponent;
};
