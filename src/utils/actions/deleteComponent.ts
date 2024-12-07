import { GluegunFilesystem } from "gluegun";
import { updateBarrelExport } from "./updateBarrelExport";

export const deleteComponent = (
    filesystem: GluegunFilesystem,
    pageName: string,
    pagesPath: string
) => {
    const pagePath = filesystem.path(pagesPath, pageName);

    filesystem.remove(pagePath);

    const barrelPath = filesystem.path(pagesPath, "index.ts");
    updateBarrelExport({
        componentName: pageName,
        fs: filesystem,
        barrelPath: barrelPath,
        action: 'remove'
    });
};