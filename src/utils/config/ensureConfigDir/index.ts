import { GluegunFilesystem } from "gluegun";

export const ensureConfigDir = (filesystem: GluegunFilesystem) => {
    const configDir = filesystem.path(filesystem.homedir(), ".sunno");
    if (!filesystem.exists(configDir)) {
        filesystem.dir(configDir);
    }
    return configDir;
};