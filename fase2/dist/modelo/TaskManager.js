// Declaramos y exportamos la clase TaskManager export permite utilizar esta clase desde interfaces,
// por ejemplo desde app.ts
export class taskManager {
    // --------------------------------------------------
    // 1. ATRIBUTOS PRIVADOS (ENCAPSULAMIENTO)
    // --------------------------------------------------
    // Array que almacena todas las tareas de la aplicación cada elemento debe cumplir la estructura definida en Tarea
    // private impide acceder directamente a este array desde fuera de la clase
    arrayTareas = [
        // Datos iniciales
        {
            id: 1,
            titulo: "Aprender la sintaxis de ES6",
            prioridad: "Alta",
            completada: true
        },
        {
            id: 2,
            titulo: "Dominar la asincronía y Fetch",
            prioridad: "Media",
            completada: false
        },
        {
            id: 3,
            titulo: "Migrar el proyecto a Angular",
            prioridad: "Baja",
            completada: false
        }
    ];
    // Guarda el filtro seleccionado por el usuario.
    // Su valor solo puede ser uno de los tipos definidos en filtro
    // "Todas", "Pendientes" o "Completadas".
    filtroActual = "Todas";
    // --------------------------------------------------
    // 2. SELECTORES DEL DOM
    // --------------------------------------------------
    // Declaramos propiedades para guardar los elementos HTML
    // con los que va a interactuar nuestra aplicación.
    formulario;
    inputTitulo;
    selectPrioridad;
    listaContenedor;
    loadingState;
    // NodeListOf permite almacenar una colección de botones HTML.
    botonesFiltro;
    // --------------------------------------------------
    // 3. CONSTRUCTOR
    // --------------------------------------------------
    // El constructor se ejecuta automáticamente cuando creamos
    // una instancia de la clase mediante new TaskManager().
    //
    // Su responsabilidad es localizar los elementos del HTML
    // y guardarlos en las propiedades de la clase.
    constructor() {
        this.formulario =
            this.obtenerElemento("#form-tareas");
        this.inputTitulo =
            this.obtenerElemento("#input-titulo");
        this.selectPrioridad =
            this.obtenerElemento("#select-prioridad");
        this.listaContenedor =
            this.obtenerElemento("#lista-tareas");
        this.loadingState =
            this.obtenerElemento("#loading-state");
        // Seleccionamos todos los botones que tienen la clase btn-filtro.
        this.botonesFiltro =
            document.querySelectorAll(".btn-filtro");
    }
    // --------------------------------------------------
    // 4. MÉTODO PRIVADO PARA OBTENER ELEMENTOS DEL DOM
    // --------------------------------------------------
    // Método genérico que busca un elemento HTML utilizando
    // su selector CSS (id, clase, etc.).
    //
    // <T extends Element> permite indicar qué tipo de elemento
    // esperamos recibir.
    //
    // Si el elemento no existe, lanzamos un error para evitar
    // trabajar con un elemento inexistente.
    obtenerElemento(selector) {
        const elemento = document.querySelector(selector);
        if (!elemento) {
            throw new Error(`No se encontró el elemento: ${selector}`);
        }
        return elemento;
    }
    // --------------------------------------------------
    // 5. MÉTODO INICIALIZAR
    // --------------------------------------------------
    // Método asíncrono encargado de arrancar la aplicación.
    //
    // Promise<void> indica que es una operación asíncrona
    // que no devuelve ningún valor.
    async inicializar() {
        // Escuchamos el evento submit del formulario.
        // Cuando el usuario añade una tarea, evitamos que
        // el navegador recargue la página.
        this.formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            // Llamamos al método encargado de añadir la tarea.
            this.agregarTarea();
        });
        // Recorremos todos los botones de filtrado.
        // Añadimos un evento click a cada uno.
        this.botonesFiltro.forEach(boton => {
            boton.addEventListener("click", () => {
                // Recuperamos el valor del atributo data-filtro
                // del botón que ha pulsado el usuario.
                const filtro = boton.dataset.filtro;
                // Comprobamos que el filtro recibido sea válido.
                if (filtro === "Todas" ||
                    filtro === "Pendientes" ||
                    filtro === "Completadas") {
                    // Quitamos la clase active de todos los botones.
                    this.botonesFiltro.forEach(btn => {
                        btn.classList.remove("active");
                    });
                    // Añadimos la clase active al botón seleccionado.
                    boton.classList.add("active");
                    // Actualizamos el filtro de la aplicación.
                    this.cambiarFiltro(filtro);
                }
            });
        });
        // Simulamos una petición al servidor.
        // La aplicación espera 1,5 segundos antes de mostrar
        // las tareas, utilizando una Promesa y setTimeout.
        await new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
        // Una vez finalizada la espera, ocultamos el mensaje
        // de carga que aparece en el HTML.
        this.loadingState.style.display = "none";
        // Mostramos las tareas iniciales en pantalla.
        this.pintarTareas();
    }
    // --------------------------------------------------
    // 6. MÉTODO PINTAR TAREAS
    // --------------------------------------------------
    // Se encarga de representar las tareas en el HTML.
    // También aplica el filtro seleccionado por el usuario.
    pintarTareas() {
        // Limpiamos el contenido anterior de la lista.
        this.listaContenedor.innerHTML = "";
        // Utilizamos filter() para obtener únicamente
        // las tareas que cumplen las condiciones del filtro actual.
        const tareasFiltradas = this.arrayTareas.filter(tarea => {
            // Si el filtro es Pendientes, mostramos las no completadas.
            if (this.filtroActual === "Pendientes") {
                return !tarea.completada;
            }
            // Si el filtro es Completadas, mostramos las finalizadas.
            if (this.filtroActual === "Completadas") {
                return tarea.completada;
            }
            // Si el filtro es Todas, mostramos todas las tareas.
            return true;
        });
        // Recorremos las tareas filtradas para crear
        // dinámicamente los elementos HTML.
        tareasFiltradas.forEach(tarea => {
            // Creamos un elemento de lista <li>.
            const li = document.createElement("li");
            // Añadimos la clase general y la clase de prioridad.
            // Esto permite aplicar los estilos definidos en CSS.
            li.classList.add("item-tarea", tarea.prioridad);
            // Creamos un elemento <span> para mostrar el título.
            const texto = document.createElement("span");
            texto.textContent = tarea.titulo;
            // Si la tarea está completada, añadimos la clase CSS
            // que muestra el texto tachado.
            if (tarea.completada) {
                texto.classList.add("completada");
            }
            // Creamos el botón para cambiar el estado de la tarea.
            const botonEstado = document.createElement("button");
            // El texto del botón depende del estado actual.
            botonEstado.textContent = tarea.completada
                ? "Marcar pendiente"
                : "Completar";
            // Cuando se pulsa el botón, llamamos a cambiarEstado()
            // enviándole el identificador de la tarea.
            botonEstado.addEventListener("click", () => {
                this.cambiarEstado(tarea.id);
            });
            // Introducimos el texto y el botón dentro del <li>.
            li.appendChild(texto);
            li.appendChild(botonEstado);
            // Finalmente, añadimos el <li> al contenedor principal.
            this.listaContenedor.appendChild(li);
        });
    }
    // --------------------------------------------------
    // 7. MÉTODO AGREGAR TAREA
    // --------------------------------------------------
    // Recoge los datos del formulario y crea una tarea nueva.
    agregarTarea() {
        // Recuperamos el título y eliminamos los espacios
        // que pueda haber al principio o al final.
        const titulo = this.inputTitulo.value.trim();
        // Recuperamos la prioridad seleccionada.
        const prioridad = this.selectPrioridad.value;
        // Comprobamos que el título no esté vacío.
        if (!titulo) {
            return;
        }
        // Comprobamos que la prioridad sea una de las permitidas.
        if (prioridad !== "Alta" &&
            prioridad !== "Media" &&
            prioridad !== "Baja") {
            return;
        }
        // Creamos un nuevo objeto que cumple la interfaz Tarea.
        // Date.now() genera un identificador basado en la fecha actual.
        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo,
            prioridad: prioridad,
            completada: false
        };
        // Añadimos la tarea utilizando el operador spread.
        // Creamos un array nuevo sin modificar directamente el anterior.
        this.arrayTareas = [
            ...this.arrayTareas,
            nuevaTarea
        ];
        // Actualizamos la representación visual de las tareas.
        this.pintarTareas();
        // Limpiamos los campos del formulario.
        this.formulario.reset();
    }
    // --------------------------------------------------
    // 8. MÉTODO CAMBIAR FILTRO
    // --------------------------------------------------
    // Recibe el filtro seleccionado y actualiza la propiedad
    // filtroActual de la clase.
    cambiarFiltro(filtro) {
        // Guardamos el nuevo filtro.
        this.filtroActual = filtro;
        // Volvemos a pintar las tareas aplicando el filtro nuevo.
        this.pintarTareas();
    }
    // --------------------------------------------------
    // 9. MÉTODO CAMBIAR ESTADO
    // --------------------------------------------------
    // Método privado que permite marcar una tarea como completada
    // o devolverla al estado pendiente.
    //
    // Recibe el identificador de la tarea que queremos modificar.
    cambiarEstado(id) {
        // Utilizamos map() para recorrer el array y generar
        // uno nuevo con el estado actualizado.
        this.arrayTareas = this.arrayTareas.map(tarea => {
            // Comprobamos si el identificador coincide.
            if (tarea.id === id) {
                // Devolvemos una copia de la tarea.
                // El operador spread conserva sus propiedades
                // y cambiamos únicamente completada.
                return {
                    ...tarea,
                    completada: !tarea.completada
                };
            }
            // Si no coincide el identificador, dejamos la tarea igual.
            return tarea;
        });
        // Actualizamos la pantalla después del cambio.
        this.pintarTareas();
    }
}
//# sourceMappingURL=taskManager.js.map