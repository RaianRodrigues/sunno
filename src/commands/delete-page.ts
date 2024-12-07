import {
    GluegunCommand,
    GluegunFilesystem,
    GluegunPrompt,
    GluegunParameters,
    GluegunPrint,
} from "gluegun";
import { loadConfig } from "../utils/config/";
import { deleteComponent } from "../utils/actions/deleteComponent";

const command: GluegunCommand = {
    name: "delete-page",
    description: "Delete a page and remove its export from index.ts",
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

            const pagesPath = filesystem.path(filesystem.cwd(), "src", "pages");

            if (!filesystem.exists(pagesPath)) {
                print.error("The pages folder does not exist.");
                return;
            }

            const pages = filesystem
                .list(pagesPath)
                ?.filter((file) => filesystem.isDirectory(filesystem.path(pagesPath, file)));

            if (!pages || pages.length === 0) {
                print.warning("No pages found in the pages folder.");
                return;
            }

            const { page } = await prompt.ask<{ page: string }>({
                type: "select",
                name: "page",
                message: "Choose a page to delete:",
                choices: pages,
            });

            const confirm = await prompt.confirm(
                `Are you sure you want to delete the page "${page}"?`
            );

            if (confirm) {
                deleteComponent(filesystem, page, pagesPath);
                print.success(`Page "${page}" deleted successfully.`);
            } else {
                print.info("Page deletion canceled.");
            }
        } catch (error) {
            print.error(`Error: ${(error as Error).message}`);
        }
    },
};

module.exports = command;
