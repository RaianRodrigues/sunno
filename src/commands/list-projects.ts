import {
  GluegunCommand,
  GluegunFilesystem,
  GluegunPrompt,
  GluegunParameters,
  GluegunPrint,
} from "gluegun";
import * as child_process from "child_process";
import { loadConfig, requestConfig, saveConfig } from "../utils/config/index";

const command: GluegunCommand = {
  name: "list-projects",
  description: "Lists the projects and allows opening them in the chosen IDE",
  run: async ({
    filesystem,
    prompt,
    print,
    parameters,
  }: {
    filesystem: GluegunFilesystem;
    prompt: GluegunPrompt;
    print: GluegunPrint;
    parameters: GluegunParameters;
  }) => {
    const listAndSelectProject = async (projectsPath: string): Promise<string | null> => {
      const projects = filesystem
        .list(projectsPath)
        ?.filter((file) => filesystem.isDirectory(filesystem.path(projectsPath, file)));

      if (!projects || projects.length === 0) {
        print.warning("No projects found in the specified folder.");
        return null;
      }

      const { project } = await prompt.ask<{ project: string }>({
        type: "select",
        name: "project",
        message: "Choose a project to open:",
        choices: projects,
      });

      return project;
    };

    try {
      let config = loadConfig(filesystem);
      config = await requestConfig(prompt, config, filesystem, parameters.options);
      saveConfig(filesystem, config);

      let project: string | null = null;

      while (true) {
        project = await listAndSelectProject(config.projectsPath!);
        if (!project) return;

        const confirm = await prompt.confirm("Are you sure?");

        if (confirm) {
          const projectPath = filesystem.path(config.projectsPath, project);
          child_process.execSync(config.ideCommand!, {
            cwd: projectPath,
            stdio: "inherit",
          });
          print.success(`Opening the project ${project}.`);
          break;
        }
      }
    } catch (error) {
      print.error(`Error: ${(error as Error).message}`);
    }
  },
};

module.exports = command;
