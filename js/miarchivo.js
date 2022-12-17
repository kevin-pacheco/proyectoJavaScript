var isRunning = true
let bienvenida = "Bienvenido!\nIngrese una opcion" 
let menuPrincipal = "1. Elegir servicios\n2. Calcular costo\n3. Elegir cuotas\n4. Adquirir servicio\n5. Salir"
let menuServicios = "1. Armado\n2. Envio a Domicilio\n3. Puesta a Punto\n4. Reiniciar\n5. Listo"

var servArmado = 1000
var servArmadoActive = false

var servEnvioDomicilio = 500
var servDomicilioActive = false

var servPuestaAPunto = 2700
var servPuntoActive = false

let cantidadCuotas = 1
let costoCuota = 0

function reiniciarServicios(){
    servArmadoActive = false
    servDomicilioActive = false
    servPuntoActive = false
    alert("Todos los servicios desactivados")
    cantidadCuotas = 1
    costoCuota = 0
}

function elegirServicios(){
    let opcionServicio
    do{
        opcionServicio = prompt("Elige el servicio que deseas activar:\n" + menuServicios)
        switch(opcionServicio){
            case "1":
                if(servArmadoActive){
                    alert("Ya tienes este servicio activo")
                }else{
                    servArmadoActive = true
                    alert("Servicio activado")
                }
                break;
            case "2":
                if(servDomicilioActive){
                    alert("Ya tienes este servicio activo")
                }else{
                    servDomicilioActive = true
                    alert("Servicio activado")
                }
                break;
            case "3":
                if(servPuntoActive){
                    alert("Ya tienes este servicio activo")
                }else{
                    servPuntoActive = true
                    alert("Servicio activado")
                }
                break;
            case "4":
                reiniciarServicios()
                break;
            case "5":
                alert("Volviendo a menu principal")
                break;
            default:
                alert("Debes ingresar un numero correspondiente al servicio")
                break;
        }
    }while(opcionServicio!="5")
}

function calcularCosto(){
    let sumaTotal = 0
    
    if(servArmadoActive){
        sumaTotal += servArmado
    }
    if(servDomicilioActive){
        sumaTotal += servEnvioDomicilio
    }
    if(servPuntoActive){
        sumaTotal += servPuestaAPunto
    }

    return sumaTotal
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
            alert("Elegiste la opcion 5. Adios!")
            isRunning = false
            break;
        default : 
            alert("No se ingreso un numero correcto\nDebe ser una de las siguientes opciones")
            break;
    }

}