import { GluegunFilesystem, GluegunParameters, GluegunPrompt } from "gluegun";
import { CLIConfig } from "../../../types/config";

export const requestConfig = async (
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
        message: "Enter the path to your projects folder:",
        initial: config?.projectsPath || filesystem.cwd(),
      });
  
      if (!filesystem.exists(projectsPath) || !filesystem.isDirectory(projectsPath)) {
        throw new Error("Invalid path! Ensure the folder exists.");
      }
  
      updatedConfig.projectsPath = projectsPath;
    }
  
    if (!config?.ideCommand || options["set-ide"]) {
      const { ideCommand } = await prompt.ask<{ ideCommand: string }>({
        type: "input",
        name: "ideCommand",
        message:
          'What command do you use to open your IDE? (Example: "code .")',
        initial: config?.ideCommand || "code .",
      });
  
      updatedConfig.ideCommand = ideCommand;
    }
  
    return updatedConfig as CLIConfig;
  };