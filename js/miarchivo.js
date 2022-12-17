
var isRunning = true
let bienvenida = "Bienvenido!\nIngrese una opcion" 
let menuPrincipal = "1. Elegir servicios\n2. Calcular costo\n3. Elegir cuotas\n4. Adquirir servicio\n5. Administrador\n6. Salir"
let menuAdmin = "1. Agregar nuevo servicio\n2. Eliminar Servicio\n3. Cantidad de servicios actuales\n4. Listo"

let menu1Servicios = "1. Armado\n2. Envio a Domicilio\n3. Puesta a Punto\n4. Reiniciar\n5. Listo"


class Servicio {
    constructor(nombre, costo) {
        this.nombre  = nombre;
        this.costo  = parseInt(costo);
        this.estaActivo = false;
    }

    activarServicio(){
        this.estaActivo = true;
    }
    desactivarServicio(){
        this.estaActivo = false;
    }
}

const servicios = []

servicios.unshift(new Servicio("Servicio de Armado","2000"));
servicios.push(new Servicio("Servicio Envio a Domicilio","500"));
servicios.push(new Servicio("Servicio de Puesta a Punto","700"));



function menuServicios(){
    let menuDeServicios = "";
    let i = 1
    for (; i <= servicios.length; i++){
        menuDeServicios += i.toString() + ". " + servicios[i-1].nombre + "\n";
    }
    

    return menuDeServicios + (i++).toString() + ". Reiniciar\n" +  (i++).toString() + ". Listo";
}


let cantidadCuotas = 1
let costoCuota = 0


function reiniciarServicios(){

    for (const servicio of servicios) {
        servicio.desactivarServicio()
    }
    cantidadCuotas = 1
    costoCuota = 0
}

function elegirServicios(){
    let opcionServicio
    
    opcionServicio = parseFloat(prompt("Elige el servicio que deseas activar:\n" + menuServicios()))
    while(opcionServicio<1 || opcionServicio>servicios.length+2){
        if(opcionServicio<1 || opcionServicio>servicios.length+2) alert("Debes ingresar un numero correspondiente al servicio");
        opcionServicio = parseFloat(prompt("Elige el servicio que deseas activar:\n" + menuServicios()));
    }
    while(true){
        //opcionServicio>0 && opcionServicio<=servicios.length+2
        if(opcionServicio<1 || opcionServicio>servicios.length+2){
            alert("Debes ingresar un numero correspondiente al servicio");
        }else{
            if(opcionServicio<=servicios.length){
                if(servicios[opcionServicio-1].estaActivo){
                    alert("Ya tienes este servicio activo")
                }else{
                    servicios[opcionServicio-1].activarServicio()
                    alert("Servicio activado")
                }
            }else{
                if(opcionServicio==servicios.length+1){
                    reiniciarServicios();
                    alert("Servicios reiniciados");
                }
                if(opcionServicio==servicios.length+2){
                    alert("Volviendo al menu principal");
                    break;
                }
            }
        }
        opcionServicio = parseFloat(prompt("Elige el servicio que deseas activar:\n" + menuServicios()));
    }
}

function calcularCosto(){
    return (servicios.filter(s => s.estaActivo)).length>0?(servicios.filter(s => s.estaActivo).map(s => s.costo)).reduce((prev, next) => prev + next):0;
}

function calcularCuotas(cantidad){
    if(cantidad>12){
        alert("El maximo numero de cuotas es 12. Asegurate de colocar correctamente las cuotas")
    }else if(calcularCosto()==0){
        alert("Primero se debe tener un servicio activo")
    }else{
        costoCuota = calcularCosto() / cantidad
        alert("Seran " + cantidad + " cuota(s) de $" + costoCuota)
    }
}

function adQuirirServicio(costoTotal,cantidadCuotas){
    if(cantidadCuotas>12){
        alert("Tienes que cambiar el numero de cuotas")
    }else if(costoTotal==0){
        alert("Primero debes tener un servicio activo")
    }else{
        console.log("Costo total del servicio: " + costoTotal)
        console.log("Se realizara el pago en " + (costoCuota!=0?cantidadCuotas:1) + " cuota(s) de $" + (cantidadCuotas==1?costoTotal:costoCuota) + " sin interes.")
        console.log("Gracias por usar nuestro servicio!")
        isRunning = false
    }
}   



function agregarNuevoServicio(){
    servicios.push(new Servicio(prompt("Ingrese nombre del servicio"),prompt("Ingrese el costo del servicio")))
    alert("Servicio agregado!\nAhora cuenta con " + servicios.length + " servicios")
}

function eliminarServicio(){
    let i = 1
    let serviciosDisponibles = ""
    for (; i <= servicios.length; i++){
        serviciosDisponibles += i.toString() + ". " + servicios[i-1].nombre + "\n";
    }
    
    let servicioEliminado = parseInt(prompt("Elige el servicio a eliminar:\n" + serviciosDisponibles))
    let nombreServicioEliminado = servicios[servicioEliminado-1].nombre
    servicios.splice(servicioEliminado-1,1)

    alert("Se elimno el siguiente servicio: \n" + nombreServicioEliminado)

}


function opcionesAdministrador(){
    
    let runningAdmin = true
    while(runningAdmin){    
        opcionAdmin = prompt("Bienvenido admin! Elige una de las opciones:\n" + menuAdmin)
        switch(opcionAdmin){
            case "1" :
                agregarNuevoServicio()
                break;
            case "2" :
                eliminarServicio()
                break;
            case "3" :
                alert("Actualmente cuenta con " + servicios.length + " servicios")
                break;
            case "4" :
                runningAdmin = false
                alert("Cerrando sesion administrador")
                break;
            default : 
                alert("No se ingreso un numero correcto")
                break;
        }
    }
    reiniciarServicios()
}


while(isRunning){
    let opcion = prompt(menuPrincipal)

    switch(opcion){
        case "1" :
            alert("Elegiste la opcion 1")
            elegirServicios()
            break;
        case "2" :
            alert("Elegiste la opcion 2")
            if(calcularCosto()==0) alert("Aun no se ha elegido un servicio"); else alert("El costo total es de: $" + calcularCosto())
            break;
        case "3" :
            alert("Elegiste la opcion 3")
            cantidadCuotas = prompt("Elige la cantidad de cuotas")
            calcularCuotas(cantidadCuotas)
            break;
        case "4" :
            alert("Elegiste la opcion 4")
            adQuirirServicio(calcularCosto(),cantidadCuotas)
            break;
        case "5" :
            alert("Opcion 5 de Administrador")
            opcionesAdministrador()
            break;
        case "6" :
            alert("Elegiste la opcion 6. Adios!")
            isRunning = false
            break;
        default : 
            alert("No se ingreso un numero correcto")
            break;
    }

}