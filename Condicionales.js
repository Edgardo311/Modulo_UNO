//Ejercicio 1 Condicionales
console.log("===Ejercicio 1: condicionales====")
//Puede votar

const edadVotante = 17;

if (edadVotante >= 18) {
    console.log("Puede votar")
}
else {
    console.log("No puede votar")    
}
console.log("===Fin del ejercicio 1===");

//Ejercicio 2 Condicionales
console.log("===Ejercicio 2: Condicionales===")

let calificacion = 0;

if (calificacion >= 90) {
    console.log("Excelente")
} else if (calificacion >= 80){
    console.log("Aprobado")
} else if (calificacion <=70) {
    console.log("Reprobado")
} else {
    console.log("Invalida")
}

console.log("Fin de ejercicio 2");


//Ejercicio 3.1 Condicionales multiples "&&"
console.log("===Condicionales multiples &&AND===")
//Puedo hacer servicio militar
const edadCadete = 16;
const esHombre = true;

if (edadCadete >= 18 && esHombre) {
    console.log("Puede hacer servicio militar")
}
else {
    console.log("No puede hacer servicio militar")    
}
console.log("===Fin del ejercicio 3.1===");

//Ejercicio 3.2 Condicionales multiples "||OR"
console.log("===Condicionales multiples ||OR===")
//Puedo hacer servicio militar
const edadCadete1 = 16;
const esHombre1 = true;

if (edadCadete1 >= 18 || esHombre1) {
    console.log("Puede hacer servicio militar")
}
else {
    console.log("No puede hacer servicio militar")    
}
console.log("===Fin del ejercicio 3.2===");
