//Ejercicio 1 SwitchCase
console.log("===Ejercicio 1: SwitchCase===");
const diaSemana = 7 
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