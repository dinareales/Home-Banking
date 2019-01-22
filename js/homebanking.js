//Declaración de variables
var nombreUsuario  = "Dina Reales";
var saldoCuenta = 4000;
var limiteExtraccion = 600;
var contraseñaCorrecta = 1234;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
iniciarSesion();

function iniciarSesion() {
    var contraseña = prompt("Por favor ingrese tu código para iniciar sesión");
    if (contraseña == contraseñaCorrecta){
        alert("Bienvenido/a Dina Reales ya puedes comenzar a realizar operaciones");
        document.body.style.display = "block";
        //quitar el display none
        window.onload = function() {
            cargarNombreEnPantalla();
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();
        }
    } else{
        saldoCuenta = 0;
        alert("Código incorrecto. Tu dinero a sido retenido por cuestiones de seguridad");
    }
}

function sumarDinero(depositarDinero){
    saldoCuenta = saldoCuenta+depositarDinero;
}

function restarDinero(depositarDinero){
    saldoCuenta = saldoCuenta-depositarDinero;
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	var nuevoLimiteDeExtraccion = parseInt(prompt("Ingrese el nuevo límite de extracción: "));
    if (isNaN(nuevoLimiteDeExtraccion)){
        return;
    }
    limiteExtraccion = nuevoLimiteDeExtraccion;
    actualizarLimiteEnPantalla();
    alert("Su nuevo limite de extracción es: "+limiteExtraccion);
}

function extraerDinero() {
	var dineroAretirar = parseInt(prompt("Ingrese la cantidad de dinero que desea retirar:"));
    var saldoAnterior = saldoCuenta;
    if(dineroAretirar > saldoCuenta){
        alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.");
    } else if(dineroAretirar > limiteExtraccion){
        alert("La cantidad de dinero que desea extraer es mayor a tu límite de extracción.");
    } else if (dineroAretirar%100 == 0 && dineroAretirar>0){
        restarDinero(dineroAretirar);
        actualizarSaldoEnPantalla();
        alert("Has retirado: $"+ dineroAretirar +"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $" +saldoCuenta);
    } else if(isNaN(dineroAretirar)){
    } else {
        alert("Solo puedes extraer billetes de 100.");
    }
}

function depositarDinero() {
    var dineroAdepositar = parseInt(prompt("Ingrese la cantidad de dinero que desea depositar"));
    if (isNaN(dineroAdepositar)){
        return;
    }
    var saldoAnterior = saldoCuenta;
    sumarDinero(dineroAdepositar);
    actualizarSaldoEnPantalla();
    alert("Has depositado: $"+ dineroAdepositar +"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $" +saldoCuenta);
}

function haySaldoDisponible(valor){
    if(valor <= saldoCuenta){
        return true;
    } else{
        return false; 
    }
}        

function pagarServicio() {
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;
    var servicio = prompt("Ingrese el número que corresponde con el servicio que quiere pagar \n1. Agua \n2. Telefono \n3. Luz \n4. Internet");
    switch(servicio){
        case "1":
        depositarServicio(agua,"agua");
        break;
        case "2":
        depositarServicio(telefono,"telefono"); 
        break;
        case "3":
        depositarServicio(luz,"luz");
        break;
        case "4":
        depositarServicio(internet,"internet");
        break;
        default:
        alert("No existe el servicio que se ha seleccionado.");
    }
}  
//Esta funcion realiza el pago de cada servicio
function depositarServicio(pagoServicio, tipoServicio){
    if(haySaldoDisponible(pagoServicio)){
        var saldoAnterior = saldoCuenta;      
        restarDinero(pagoServicio);
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio del  "+tipoServicio+ "."+"\nSaldo anterior: $"
           +saldoAnterior+"\nDinero descontado: $" +pagoServicio+"\nSaldo actual: $" +saldoCuenta);
    } else {
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
    }
}

function transferirDinero() {
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;
    var saldoATransferir = parseInt(prompt("Ingrese la cantidad de dinero que desea transferir"));
    if(haySaldoDisponible(saldoATransferir)){
        var numeroDeCuenta = parseInt(prompt("Ingrese el numero cuenta al que le desea transferir el dinero"));    
        if(numeroDeCuenta === cuentaAmiga1 || numeroDeCuenta === cuentaAmiga2){
            restarDinero(saldoATransferir);
            actualizarSaldoEnPantalla();
            alert("Se han transferido: $"+saldoATransferir+"\nCuenta de destino: "+numeroDeCuenta);
        } else{
            alert("Solo se puede transferir a una cuenta amiga");
        }} else {
            alert("No se puede transferir esa cantidad de dinero");
        }
    }

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}