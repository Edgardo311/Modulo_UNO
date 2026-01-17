// Obejetivo: Calcular descuentos en compras

/*

Función para calcular el precio final después del descuento

Parámetros:
- precioOriginal: número que representa el precio inicial del producto
- descuento: número que representa el porcentaje de descuento a aplicar (entre 0 y 100)

Retorna:
- precioFinal: número que representa el precio después de aplicar el descuento

Reglas:
- no se debe de usar console.log dentro de la función

*/

console.log("=== EJERCICIO: Cálculo de Descuentos ===");


// permite definir en la consola las variables
let precioOriginal = process.argv[2];
let descuento = process.argv[3];


console.log(precioOriginal);
console.log(descuento); 

PrecioOriginal = 100 "pesos"
Descuento = 15

function DeterminarPrecioFinal (PrecioOriginal, Descuento) {
    const PorcentajeDescuento = Descuento / 100;
    const montoDescuento = PrecioOriginal * PorcentajeDescuento;
    return PrecioOriginal - montoDescuento

}   

console.log("El precio final es:", DeterminarPrecioFinal(PrecioOriginal, Descuento));