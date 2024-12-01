import { GluegunCommand } from "gluegun";
import * as path from "path";
import * as fs from "fs";
import * as child_process from "child_process";
import { CLIConfig } from "../types/config";

const command: GluegunCommand = {
  name: "list-projects",
  description:
    "Lista os projetos e permite abrir na IDE que o usuário escolher",
  alias: ["lp"],
  run: async ({ filesystem, prompt, print, parameters }) => {
    const configFile = path.join(process.cwd(), ".sunno-config.json");

    const loadConfig = (): CLIConfig | null => {
      if (fs.existsSync(configFile)) {
        return JSON.parse(fs.readFileSync(configFile, "utf-8")) as CLIConfig;
      }
      return null;
    };

    const saveConfig = (config: CLIConfig): void => {
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      print.info("Configurações salvas!");
    };

    let config = loadConfig();

    if (!config || parameters.options["set-path"]) {
      const { path: projectsPath } = await prompt.ask({
        type: "input",
        name: "path",
        message: "Informe o caminho para sua pasta de projetos:",
        initial: config?.projectsPath || filesystem.cwd(),
      });

      if (
        !filesystem.exists(projectsPath) ||
        !filesystem.isDirectory(projectsPath)
      ) {
        print.error("Caminho inválido! Certifique-se de que a pasta existe.");
        return;
      }

      config = { projectsPath };
      saveConfig(config);
    }

    if (!config.ideCommand || parameters.options["set-ide"]) {
      const { ideCommand } = await prompt.ask({
        type: "input",
        name: "ideCommand",
        message:
          'Qual comando você usa para abrir a sua IDE? (Exemplo: "code .")',
        initial: config?.ideCommand || "code .",
      });

      config.ideCommand = ideCommand;
      saveConfig(config);
    }

    const projects = filesystem.list(config.projectsPath).filter((file) => {
      return filesystem.isDirectory(`${config!.projectsPath}/${file}`);
    });

    if (projects.length > 0) {
      const { project } = await prompt.ask({
        type: "select",
        name: "project",
        message: "Escolha um projeto para abrir:",
        choices: projects,
      });

      const projectPath = `${config!.projectsPath}/${project}`;

      try {
        child_process.execSync(config!.ideCommand, {
          cwd: projectPath,
          stdio: "inherit",
        });
        print.success(`Abrindo o projeto ${project}.`);
      } catch (error) {
        print.error(
          `Não foi possível abrir o projeto com o comando "${
            config!.ideCommand
          }". Certifique-se de que o comando está correto e que a IDE está instalada.`
        );
      }
    } else {
      print.warning("Nenhum projeto encontrado na pasta especificada.");
    }
  },
};

module.exports = command;