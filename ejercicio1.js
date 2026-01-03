console.log("¡Hola, mundo!");// Funcionalidad básica de salida en consola


console.log("===Strings (cadenas de texto)===");
let nombre = "Juan";//Variable para almacenar el nombre
let apellido = "Rodriguez";//Variable para almacenar el apellido

let nombrecompleto = nombre + " " + apellido;//Concatenación de cadenas
console.log("Mi nombre comple es: " + nombrecompleto);


nombre = "María";//Reasignación de nombre
console.log("Ahora mi nombre es " + nombre);


//Dado estas salidas, crea las variables que se necesitan, (Todos son números)

let edad = 42
let altura = 1.80
let Temperatura = 25
let resultado = edad + 5

console.log("Tengo " + edad + " " + "años.");
console.log("Mi altura es: ", altura, "metros");
console.log("Temperatura: ", altura, "C");
console.log("Resultado: ", resultado, "años");

console.log("===Booleanos (true/false===")
let esVerdadero = true;//Vareable Booleana
let esFalso = false;//Vareable Booleana
let cadenaDevalor = esVerdadero && esFalso; //Operación AND entre booleanos

console.log("Esto es verdadero:", esVerdadero);
console.log("Esto es falso:", esFalso);
console.log("El resultado de la operación AND es:", cadenaDevalor);

let esMayordeedad = false;
let tieneLicencia = true;
let puedeConducir = esMayordeedad && tieneLicencia;


console.log("Es mayor de edad? ", esMayordeedad);
console.log("Tiene licencia? ", tieneLicencia);
console.log("Puede conducir? ", puedeConducir);


let esMayorde18años = true;
let tieneINE = true;
let puedeVotar = esMayorde18años && tieneINE;//&& (AND), deben de cumplirse dos condiciones y el resultado seráverdadero
// OR si se cumple 1 condicionante será verdadero.
// NOR si son negativas ambas condiciones, el resultado es verdadero.

console.log("Es mayor de edad? ", esMayorde18años);
console.log("Tiene INE? ", tieneINE);
console.log("Puede votar? ", puedeVotar);
