import type { Filtro } from "../interfaces/tareaInterface";
export declare class taskManager {
    private arrayTareas;
    private filtroActual;
    private formulario;
    private inputTitulo;
    private selectPrioridad;
    private listaContenedor;
    private loadingState;
    private botonesFiltro;
    constructor();
    private obtenerElemento;
    inicializar(): Promise<void>;
    pintarTareas(): void;
    agregarTarea(): void;
    cambiarFiltro(filtro: Filtro): void;
    private cambiarEstado;
}
//# sourceMappingURL=taskManager.d.ts.map