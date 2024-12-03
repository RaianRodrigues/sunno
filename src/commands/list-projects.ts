import {
  GluegunCommand,
  GluegunFilesystem,
  GluegunPrompt,
  GluegunParameters,
  GluegunPrint,
} from "gluegun";
import * as child_process from "child_process";
import { CLIConfig } from "../types/config";

const ensureConfigDir = (filesystem: GluegunFilesystem) => {
  const configDir = filesystem.path(filesystem.homedir(), ".sunno");
  if (!filesystem.exists(configDir)) {
    filesystem.dir(configDir);
  }
  return configDir;
};

const loadConfig = (filesystem: GluegunFilesystem): CLIConfig | null => {
  const configDir = ensureConfigDir(filesystem);
  const configFile = filesystem.path(configDir, "config.json");

  if (filesystem.exists(configFile)) {
    const content = filesystem.read(configFile, "utf8");
    return content ? (JSON.parse(content) as CLIConfig) : null;
  }
  return null;
};

const saveConfig = (
  filesystem: GluegunFilesystem,
  config: CLIConfig
): void => {
  const configDir = ensureConfigDir(filesystem);
  const configFile = filesystem.path(configDir, "config.json");
  filesystem.write(configFile, JSON.stringify(config, null, 2));
};

const requestConfig = async (
  prompt: GluegunPrompt,
  config: CLIConfig | null,
  filesystem: GluegunFilesystem,
  options: GluegunParameters["options"]
): Promise<CLIConfig> => {
  const updatedConfig = { ...config };

  if (!config?.projectsPath || options["set-path"]) {
    const { projectsPath } = await prompt.ask<{ projectsPath: string }>({
      type: "input",
      name: "projectsPath",
      message: "Informe o caminho para sua pasta de projetos:",
      initial: config?.projectsPath || filesystem.cwd(),
    });

    if (!filesystem.exists(projectsPath) || !filesystem.isDirectory(projectsPath)) {
      throw new Error("Caminho inválido! Certifique-se de que a pasta existe.");
    }

    updatedConfig.projectsPath = projectsPath;
  }

  if (!config?.ideCommand || options["set-ide"]) {
    const { ideCommand } = await prompt.ask<{ ideCommand: string }>({
      type: "input",
      name: "ideCommand",
      message:
        'Qual comando você usa para abrir a sua IDE? (Exemplo: "code .")',
      initial: config?.ideCommand || "code .",
    });

    updatedConfig.ideCommand = ideCommand;
  }

  return updatedConfig as CLIConfig;
};

const command: GluegunCommand = {
  name: "list-projects",
  description: "Lista os projetos e permite abrir na IDE que o usuário escolher",
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
    try {
      let config = loadConfig(filesystem);
      config = await requestConfig(prompt, config, filesystem, parameters.options);
      saveConfig(filesystem, config);

      const projectsPath = config.projectsPath!;
      const projects = filesystem
        .list(projectsPath)
        ?.filter((file) => filesystem.isDirectory(filesystem.path(projectsPath, file)));

      if (!projects || projects.length === 0) {
        print.warning("Nenhum projeto encontrado na pasta especificada.");
        return;
      }

      const { project } = await prompt.ask<{ project: string }>({
        type: "select",
        name: "project",
        message: "Escolha um projeto para abrir:",
        choices: projects,
      });

      const projectPath = filesystem.path(projectsPath, project);
      child_process.execSync(config.ideCommand!, {
        cwd: projectPath,
        stdio: "inherit",
      });
      print.success(`Abrindo o projeto ${project}.`);
    } catch (error) {
      print.error(`Erro: ${(error as Error).message}`);
    }
  },
};

module.exports = command;
