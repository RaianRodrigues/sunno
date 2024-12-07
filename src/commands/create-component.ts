import { GluegunCommand } from "gluegun";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

const command: GluegunCommand = {
    name: "create-component",
    description: "Create ReactJs components",
    run: async ({ Aux, parameters: { first: name } }: Toolbox) => {
        await Aux({ folder: 'src/components', name });
    },
};

module.exports = command;