/* Todo: Crea un programa que recorra un arreglo de numeros y determine
cauntos valores son:
-Positivos
-Negativos
-Ceros

Además, debe mostrar en consola:
1. La cantidad de positivos
2. La canitdad de negativos
3. La cantidad de ceros

Arreglos:
numerosUno: [5, -3 0, 12 -7, 0, 9];
numerosDos: [0, 0, 0, 4, 8];
numerosTres: [-1, -5, -10, 3, 6];

Tip: Usa un bucle para recorrer el arreglo y condicionales para clasificar los números.

Ejemplo de salida esperada:
Positiva: 3
Negativa: 2
Ceros: 2 
*/

//Crea un programa que recorra un arreglo de numeros y determine




let numerosUno = [5, -3, 0, 12 -7, 0, 9];
let numerosDos = [0, 0, 0, 4, 8];
let numerosTres = [-1, -5, -10, 3, 6];

console.log("Numeros: ", numerosUno);

// variables de referencia:

let cero = 0;
let positivo = 0;
let negativo = 0;


//Determina cuantos valores son positivos y negativos:

for ( let i = 0; i < numerosUno.length; i++){
    console.log("numerosUno:", i);

    if(numerosUno[i] == 0)
    cero = cero + 1; 

    else if(numerosUno[i] > 0)
    positivo = positivo + 1; 

    else if(numerosUno[i] < 0)
    negativo = negativo + 1; 

    }




console.log("Ceros: ", cero);
console.log("Positivos: ", positivo);
console.log("Positivos: ", negativo);



