import { GluegunCommand } from "gluegun";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

const command: GluegunCommand = {
    name: "create-page",
    description: "Create ReactJs pages",
    run: async ({ Aux, parameters: { first: name } }: Toolbox) => {
        await Aux({ folder: 'src/pages', name });
    },
};

module.exports = command;
