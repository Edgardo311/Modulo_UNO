// =======Reto final=======
console.log("===Reto Final===");
/* Todo: Crea un programa que calcule el promedio de las calificaciones dadas con arreglo
de calificaciones y muestre el resultado en consola donde 
A = 90- 100;
B = 80 - 89;
C = 70- 79;
D = 60- 69;
F = 0- 59;


Arreglos
CalificacionesUno [85, 90, 78, 92, 88];
CalificacionesDos [85, 90, 78];
CalificacionesTres [65, 70, 72, 68, 60];
*/




let calificacionesTres = [85, 90, 78];
console.log("Calificaciones: ", calificacionesTres);

let resultado = 0;
let promedio;


for (let i = 0; i < calificacionesTres.length; i++) {
    //primera vez de i = 0; resultado = 0 + calificación[0];
    //segunda vez de i = 1; resultado = resultado(65) + calificación[1](70); = 135
    //tercera vez de i = 2; resultado = resultado(135) + calificación[2](72);
    //cuarta vez de i = 3; resultado = resultado(207) + calificación[3](68);
    //cuarta vez de i = 4; resultado = resultado(275) + calificación[4](60); 
    console.log("CalificacionesTres:", i);

    resultado = resultado + calificacionesTres[i];
    
}

console.log("Suma de calificaciones: ", resultado);

Promedio = resultado / calificacionesTres.length;

// Todo: Muestra un Mensaje "Mi promedio es: [resultado]"
console.log(`Mi promedio es ", ${Promedio}`);

const calificacion = promedio; 
let parametro;

switch (calificacion){
    case 1:
        calificacion = promedio > 80, "Lacalificacion es A";
        break;
    default:
        nombreDia = "Dia invalido"
}

console.log("Calificacion es: ", calificacion);
console.log("Fin de ejercicio 1")