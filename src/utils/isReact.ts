import { GluegunFilesystem } from "gluegun";

export async function isReact(filesystem: GluegunFilesystem) {
    const packagePath = filesystem.path('package.json');

    if (!filesystem.exists(packagePath)) {
        throw new Error("Error: The package.json file was not found in this directory.");
    }

    const packageJson = filesystem.read(packagePath, 'json');

    if (!packageJson || !packageJson.dependencies.react) {
        throw new Error("Error: React is not listed as a dependency in package.json.");
    }

    return true;
}