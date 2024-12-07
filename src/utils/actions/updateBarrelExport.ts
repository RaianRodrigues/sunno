import { UpdateBarrelProps } from "../../types/config";

export const updateBarrelExport = ({
    componentName,
    fs,
    barrelPath,
    action = "add",
}: UpdateBarrelProps & { action?: "add" | "remove" }) => {
    if (!fs || typeof fs.exists !== "function") {
        throw new Error("Error: Invalid 'fs' object.");
    }

    if (!barrelPath || typeof barrelPath !== "string") {
        throw new Error("Error: Invalid barrel path.");
    }

    const exportLine = `export * from './${componentName}';`;

    if (action === "add") {
        // Adicionar a exportação
        if (fs.exists(barrelPath)) {
            const barrelContent = fs.read(barrelPath, "utf8");
            if (!barrelContent.includes(exportLine)) {
                fs.append(barrelPath, exportLine + "\n");
            }
        } else {
            fs.write(barrelPath, exportLine + "\n");
        }
    } else if (action === "remove") {
        // Remover a exportação
        if (fs.exists(barrelPath)) {
            const barrelContent = fs.read(barrelPath, "utf8");
            const updatedContent = barrelContent
                .split("\n")
                .filter((line) => line.trim() !== exportLine) // Remove a linha específica
                .join("\n");

            fs.write(barrelPath, updatedContent);
        }
    }
};
