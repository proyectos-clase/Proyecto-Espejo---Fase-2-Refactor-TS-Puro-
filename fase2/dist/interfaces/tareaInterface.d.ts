export type Prioridad = "Alta" | "Media" | "Baja";
export type Filtro = "Todas" | "Pendientes" | "Completadas";
export interface Tarea {
    id: number;
    titulo: string;
    prioridad: Prioridad;
    completada: boolean;
}
//# sourceMappingURL=tareaInterface.d.ts.map