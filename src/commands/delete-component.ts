import {
    GluegunCommand,
    GluegunFilesystem,
    GluegunPrompt,
    GluegunParameters,
    GluegunPrint,
} from "gluegun";

import { loadConfig } from "../utils/config";
import { deleteComponent } from "../utils/actions/deleteComponent";

const command: GluegunCommand = {
    name: "delete-component",
    description: "Delete a component and remove its export from index.ts",
    run: async ({
        filesystem,
        prompt,
        print,
    }: {
        filesystem: GluegunFilesystem;
        prompt: GluegunPrompt;
        print: GluegunPrint;
        parameters: GluegunParameters;
    }) => {
        try {

            let config = loadConfig(filesystem);

            if (!config) {
                throw new Error("Configuration not found. Run the setup command first.");
            }

            const componentsPath = filesystem.path(filesystem.cwd(), "src", "components");

            if (!filesystem.exists(componentsPath)) {
                print.error("The components folder does not exist.");
                return;
            }

            const components = filesystem
                .list(componentsPath)
                ?.filter((file) => filesystem.isDirectory(filesystem.path(componentsPath, file)));

            if (!components || components.length === 0) {
                print.warning("No components found in the components folder.");
                return;
            }

            const { component } = await prompt.ask<{ component: string }>({
                type: "select",
                name: "component",
                message: "Choose a component to delete:",
                choices: components,
            });

            const confirm = await prompt.confirm(
                `Are you sure you want to delete the component "${component}"?`
            );

            if (confirm) {
                deleteComponent(filesystem, component, componentsPath);
                print.success(`Component "${component}" deleted successfully.`);
            } else {
                print.info("Component deletion canceled.");
            }
        } catch (error) {
            print.error(`Error: ${(error as Error).message}`);
        }
    },
};

module.exports = command;
