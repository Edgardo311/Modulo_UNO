//funcion
function saludo() {
    //Proceso
    console.log("Hola, bienvenido desde funtion saludo");
}
// fin de la funcion

//funcion 2 con salida
function saludoEspanol() {
    return "Hola, bienvendio a la práctica dos de ADA";
};
// fin de funcion

//funcion 3 entradas y salidas
function saludoIdioma(idioma) {
    if (idioma === "es") {
        return "Hola, bienvenido a la práctica dos de DAD";
    } else if (idioma === "en") {
        return "Hello, welcome to DAD practice two";
    } else if (idioma === "fr") {
        return "Bonjur, bienvenue a la pratique deux de DAD";
    } else {
        return "Idioma no soportado.";
    }
}
//llamado a las funciones

saludo(); // Llamada a la funcion 1

let mensaje = saludoEspanol(); //llamada a la función 2 
console.log(mensaje);

let mensajeIngles = saludoIdioma("en"); //llamada a la función 2 
console.log(mensajeIngles);

let mensajeFrances = saludoIdioma("fr");