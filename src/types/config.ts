import { GluegunFilesystem } from "gluegun";

export interface CLIConfig {
  projectsPath: string;
  ideCommand?: string;
}

export interface AuxProps {
  folder: string;
  name: string
}

export interface UpdateBarrelProps {
  componentName: string;
  fs: GluegunFilesystem;
  barrelPath: string;
}