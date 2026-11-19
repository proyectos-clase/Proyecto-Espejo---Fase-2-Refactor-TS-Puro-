Autor: Jorge Jiménez González
Proyecto: Proyecto Espejo
Fase: 2 – Refactorización con TypeScript

📋 Descripción:

En esta segunda fase del Proyecto Espejo se realiza la refactorización de la aplicación de gestión de tareas desarrollada en la Fase 1, utilizando TypeScript puro.

El objetivo es organizar y mejorar el código mediante Programación Orientada a Objetos (POO), encapsulación y tipado estricto, separando las responsabilidades de la aplicación en diferentes archivos.

La gestión de las tareas se centraliza en la clase TaskManager, mientras que la estructura de las tareas se define mediante una interfaz propia.

🎯 Objetivos:

Refactorizar la aplicación de tareas utilizando TypeScript.
Aplicar tipado estricto para mejorar la seguridad del código.
Implementar Programación Orientada a Objetos.
Utilizar clases, interfaces y encapsulación.
Separar el modelo de datos de la lógica de la aplicación.
Mantener una estructura organizada y modular.
Compilar TypeScript a JavaScript.

🛠️ Tecnologías utilizadas:

TypeScript: desarrollo de la lógica y tipado del proyecto.
JavaScript: código generado tras la compilación.
HTML: estructura de la aplicación.
CSS: diseño y presentación visual.
POO: organización mediante clases y encapsulación.

📁 Estructura del proyecto:

```
fase2/
├── dist/
├── src/
│   ├── interfaces/
│   │   └── tareaInterface.ts
│   ├── modelo/
│   │   └── taskManager.ts
│   └── app.ts
├── index.html
├── styles.css
├── tsconfig.json
└── README.md
```

Descripción de los archivos:

src/interfaces/tareaInterface.ts	Define la interfaz que establece la estructura y los tipos de datos de las tareas.

src/modelo/taskManager.ts	Contiene la clase encargada de gestionar las tareas y centralizar su lógica.

src/app.ts	Archivo principal que conecta la lógica de la aplicación con su funcionamiento.

index.html	Estructura HTML de la aplicación.

styles.css	Estilos visuales de la interfaz.

tsconfig.json	Configuración del compilador de TypeScript.

dist/	Directorio destinado a los archivos JavaScript generados durante la compilación.

⚙️ Organización y funcionamiento

El proyecto está organizado siguiendo una separación de responsabilidades:

Interfaces: definen la estructura de los datos y permiten aplicar tipado estricto.
Modelo: contiene la clase TaskManager, que centraliza la gestión de las tareas mediante POO.
Aplicación: app.ts actúa como punto de entrada de la lógica de la aplicación.
Interfaz visual: HTML y CSS se encargan de la estructura y presentación.
Compilación: TypeScript transforma los archivos .ts en JavaScript para su ejecución.
