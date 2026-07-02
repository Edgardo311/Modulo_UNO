//Ejercicio 1 SwitchCase
console.log("===Ejercicio 1: SwitchCase===");
const diaSemana = 4; 
let nombreDia;

switch (diaSemana){
    case 1:
        nombreDia = "Lunes"
        break;
    case 2:
        nombreDia = "Martes"
        break;
    case 3:
        nombreDia = "Miércoles"
        break;
    case 4:
        nombreDia = "Jueves"
        break;
    case 5:
        nombreDia = "Viernes"
        break;
    case 6:
        nombreDia = "Sábado"
        break;
    case 7:
        nombreDia = "Domingo"
        break;
    default:
        nombreDia = "Dia invalido"
}

console.log("El día de la semana es: ", nombreDia);
console.log("Fin de ejercicio 1")

//Ejercicio 2 SwitchCase
console.log("===Ejercicio 2: SwitchCase===");
const diaSemana1 = 5; 
let nombreDia1;

switch (diaSemana1){
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        nombreDia1 = "Día laboral"
        break;
    case 6:
    case 7:
        nombreDia1 = "Fin de semana"
        break;
    default:
        nombreDia1 = "Dia invalido"
}

console.log("El día de la semana es: ", nombreDia1);
console.log("Fin de ejercicio 1")