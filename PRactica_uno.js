// ===== CUESTIONARIO: TIPOS DE DATOS EN JAVASCRIPT =====
// Instrucciones: Completa los ejercicios siguiendo los ejemplos

console.log("=== EJERCICIO 1: NUMBERS ===");
// Ejemplo:
const precioLibro = 250;
console.log("Precio del libro:", precioLibro);

// TODO: Crea una constante llamada 'precioLapiz' con valor 15
// TODO: Muestra en consola el precio del lápiz

const precioLapiz = 15 + " pesos";
console.log("Precio del lápiz:", precioLapiz);

// TODO: Crea una variable llamada 'edadEstudiante' con tu edad
// TODO: Muestra en consola tu edad

const edadEstudiante = 42 + " años";
console.log("Edad del alumno ", edadEstudiante);

// TODO: Crea dos variables (numero1 = 8, numero2 = 3) y muestra su suma
// TODO: Muestra la multiplicación de numero1 y numero2

const numero1 = 8;
const numero2 = 3;
console.log("El resultado de la sumatoria es: ", numero1+numero2);
console.log("El resultado de la multiplicación es: ", numero1*numero2);

console.log("\n=== EJERCICIO 2: STRINGS ===");
// Ejemplo:
let miNombre = "Pedro";
console.log("Mi nombre es:", miNombre);

// TODO: Crea una variable llamada 'tuNombre' con tu nombre completo
// TODO: Muestra en consola tu nombre

const nombre = "Edgardo";
console.log("Mi nombre es: ",nombre);

// TODO: Crea una variable llamada 'materiaFavorita' 
// TODO: Muestra en consola: "Mi materia favorita es: [tuMateria]"

const materiaFavorita = "Programación";
console.log("Mi materia favorita es ", materiaFavorita);

// TODO: Crea dos variables: nombre y apellido
// TODO: Concatena ambas variables y muestra el nombre completo

//La variable (const) nombre ya fue definida previamente
const apellido = "Flores";
console.log("Nombre completo: ", nombre + apellido);
console.log("Nombre completo: ", nombre, apellido);

// TODO: Usa template literals (``) para mostrar: "Hola, soy [nombre] y tengo [edad] años"

//La variable (const) nombre ya fue definida previamente, así como la edad;
console.log(`Hola, soy ${nombre} y tengo ${edadEstudiante}`);
console.log("Hola, soy ", nombre, "y tengo ", edadEstudiante);


console.log("\n=== EJERCICIO 3: BOOLEAN ===");
// Ejemplo:
const tengoCelular = true;
console.log("¿Tengo celular?", tengoCelular);

// TODO: Crea una variable 'esFinDeSemana' con valor false
// TODO: Muestra en consola si es fin de semana

const esFinDeSemana = false;
console.log("¿Es fin de semana?", esFinDeSemana);

// TODO: Crea una variable 'tengoTarea' con valor true
// TODO: Muestra en consola si tienes tarea

const tengoTarea = true;
console.log("¿Tengo tarea?", tengoTarea);

// TODO: Crea una variable 'miEdad' con tu edad
// TODO: Crea una variable 'soyMayorDeEdad' que compare si miEdad >= 18
// TODO: Muestra el resultado en consola

const miEdad = 42;
const soyMayorDeEdad = miEdad >= 18;
console.log("¿eres mayor de edad?", soyMayorDeEdad);

console.log("\n=== EJERCICIO 4: ARRAYS ===");
// Ejemplo:
const colores = ["rojo", "azul", "verde"];
console.log("Colores:", colores);
console.log("Primer color:", colores[0]);

// TODO: Crea un array llamado 'materiasEscuela' con 3 materias
// TODO: Muestra el array completo en consola

const materiasEscuela = ["Español","Inglés","Música"];
console.log("Materias", materiasEscuela);

// TODO: Muestra solo la primera materia del array
// TODO: Muestra solo la segunda materia del array

console.log("Primera materia: ", materiasEscuela[0]);
console.log("Segunda materia: ", materiasEscuela[1]);

// TODO: Muestra cuántas materias hay en el array usando .length

console.log("Números de materia: ", materiasEscuela.length);

// TODO: Crea un array llamado 'calificaciones' con 5 números
// TODO: Muestra el array y la cantidad de calificaciones

const calificaciones = [1, 2, 3, 4, 5];
console.log("calificaciones: ", calificaciones);
console.log("cantidad de calificaciones; ", calificaciones.length);

console.log("\n=== EJERCICIO 5: COMBINADO ===");
// TODO: Crea un objeto estudiante con las siguientes propiedades:
//       - nombre (string)
//       - edad (number)
//       - materias (array con 3 materias)
//       - activo (boolean)
// TODO: Muestra el objeto completo
// TODO: Muestra solo el nombre del estudiante
// TODO: Muestra la primera materia del array de materias

// const nombre = "Edgardo", esta variable está definida previamente
const edad = "42 años";
const materias = ["Mátematicas", "Historia", "Geografía"];
const activo = true;

const estudiante = {
  nombre: "Edgardo",
  edad: 42,
  materias: ["Matemáticas", "Historia", "Ciencias"],
  activo: true
};

console.log(`Nombre: ${nombre}, edad: ${edad}, materias ${materias}, activo ${activo}`);
console.log("Estudiante, ", estudiante)

// ===== RETO FINAL =====
console.log("\n=== RETO FINAL ===");
// TODO: Crea un programa que calcule el promedio de 3 calificaciones
// Pista: suma las 3 calificaciones y divide entre 3
// TODO: Muestra un mensaje: "Mi promedio es: [resultado]"

const calificacionesindividuales = [10, 5, 5];
const suma = calificacionesindividuales.reduce((acum, valor) => acum + valor, 0);
const promedio = suma/calificacionesindividuales.length;
console.log("Mi promedio es: ", promedio);