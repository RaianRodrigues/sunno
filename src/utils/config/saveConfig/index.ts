import { GluegunFilesystem } from "gluegun";
import { CLIConfig } from "../../../types/config";
import { ensureConfigDir } from "../ensureConfigDir";

export const saveConfig = (
    filesystem: GluegunFilesystem,
    config: CLIConfig
  ): void => {
    const configDir = ensureConfigDir(filesystem);
    const configFile = filesystem.path(configDir, "config.json");
    filesystem.write(configFile, JSON.stringify(config, null, 2));
  };