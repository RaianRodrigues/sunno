import { GluegunCommand } from "gluegun";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

const command: GluegunCommand = {
    name: "create-page",
    description: "Create ReactJs pages",
    run: async ({ generateComponent, parameters: { first: name } }: Toolbox) => {
        await generateComponent({ folder: 'src/pages', name });
    },
};

module.exports = command;
