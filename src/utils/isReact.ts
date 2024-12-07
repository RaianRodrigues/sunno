import { GluegunFilesystem } from "gluegun";

export async function isReact(filesystem: GluegunFilesystem) {
    const packagePath = filesystem.path('package.json');

    if (!filesystem.exists(packagePath)) {
        throw new Error("Erro: O arquivo package.json não foi encontrado neste diretório.");
    }

    const packageJson = filesystem.read(packagePath, 'json');

    if (!packageJson || !packageJson.dependencies.react) {
        throw new Error("Erro: O React não está listado como dependência no package.json.");
    }

    return true;
}