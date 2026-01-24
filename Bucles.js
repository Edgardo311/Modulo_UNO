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

