//Bucles
console.log("===Ejericicio 4: for===")

// let i = 1; inicio
// i <= 5; Condición de continuación 
// i++ Incremento


for  (let i = 1; i <= 10; i++) {
    console.log("Números:", i);
}

for  (let i = 1; i <= 10; i+=5) {
    console.log("Números:", i);
}


console.log("Fin de ejercicio 4");

console.log("===Ejericicio 4: arrays/arreglos===")
let frutas = ["Manzanas", "Bananas", "cerezas", "duraznos", "uvas"];
console.log("frutas ", frutas)
console.log("Cantidad de frutas: ", frutas.lenght);

for (let i = 0; i < frutas.length; i++) {
    console.log("Frutas en posición", i + ":", frutas[i]);
}

console.log("Fin de ejercicio 4 arrays/arreglos");

console.log("===Ejericicio 5: arrays/arreglos con modificación===")
frutas = ["Manzanas", "Bananas"];
console.log("frutas ", frutas)
console.log("Cantidad de frutas: ", frutas.lenght);

for (let i = 0; i < frutas.length; i++) {
    console.log("Frutas en posición", i + ":", frutas[i]);
}

console.log("Fin de ejercicio 5: arrays/arreglos con modificación");

// =======Reto final=======
console.log("===Reto Final===");
// Todo: Crea un programa que calcule el promedio de 3 calificaciones
const calificacion 1 = 85;
const calificacion 2 = 90;
const calificacion 3 = 78;
// Pista: suma las 3 calificaciones y divide entre 3
const resultado = (caliicacion1 +calificacion 2 + calificacion 3) / 3;
// Todo: Muestra un Mensaje "Mi promedio es: [resoltado]"
console.log(`Mi promedio es ", ${resultado}`);