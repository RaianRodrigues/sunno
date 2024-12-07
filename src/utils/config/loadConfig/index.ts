import { GluegunFilesystem } from "gluegun";
import { ensureConfigDir } from "../ensureConfigDir";
import { CLIConfig } from "../../../types/config"

export const loadConfig = (filesystem: GluegunFilesystem): CLIConfig | null => {
    const configDir = ensureConfigDir(filesystem);
    const configFile = filesystem.path(configDir, "config.json");

    if (filesystem.exists(configFile)) {
        const content = filesystem.read(configFile, "utf8");
        return content ? (JSON.parse(content) as CLIConfig) : null;
    }
    return null;
};