// Funciones

let numerosUno = [5, -3, 0, 12 -7, 0, 9];
let numerosDos = [0, 0, 0, 4, 8];
let numerosTres = [-1, -5, -10, 3, 6];

function contarNumeros(arregloNumeros){
    
    let cero = 0;
    let positivo = 0;
    let negativo = 0;
    
    for ( let i = 0; i < arregloNumeros.length; i++){
    
    if(arregloNumeros[i] == 0)
    cero = cero + 1; 

    else if(arregloNumeros[i] > 0)
    positivo = positivo + 1; 

    else if(arregloNumeros[i] < 0)
    negativo = negativo + 1; 

    console.log("Ceros: ", cero);
    console.log("Positivos: ", positivo);
    console.log("Negativo: ", negativo);
    console.log("Total de números en el arreglo: ", arregloNumeros.length);

    }

}

console.log('Primero arreglo');

contarNumeros(numerosUno);

console.log('Segundo arreglo');

contarNumeros(numerosDos);

console.log('Tercer arreglo');

contarNumeros(numerosTres);
