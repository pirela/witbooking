export interface TypeNewApp {
  host: string;
  app: TypeProyecto;
}

export interface TypeProyecto {
  apdex: number;
  contributors: string[];
  host: string[];
  name: string;
  version: number;
}
export interface TypeHostData {
  data: { [key: string]: TypeProyecto[] };
  limit?: number;
}

export interface TypeData1 {
  host: TypeProyecto[];
}
