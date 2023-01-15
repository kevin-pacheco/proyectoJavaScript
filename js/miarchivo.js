class Servicio {
    constructor(obj) {
        this.nombre  = obj.nombre;
        this.costo  = parseInt(obj.costo);
        this.estaActivo = obj.estaActivo;
    }

    activarServicio(){
        this.estaActivo = true;
    }
    desactivarServicio(){
        this.estaActivo = false;
    }
}

const servicios = []

servicios.push(new Servicio("Servicio de Armado","2000",false));
servicios.push(new Servicio("Servicio Envio a Domicilio","500",false));
servicios.push(new Servicio("Servicio de Puesta a Punto","700",false));

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
for (const servicio of servicios) {
    guardarLocal(servicios.nombre, JSON.stringify(servicio));
}


// ** MENU ACTIVO ** //

let botonInicio = document.getElementById("tab-inicio")
let botonCarrito = document.getElementById("tab-carrito")

let contentInicio = document.getElementById("content-inicio")
let contentCarrito = document.getElementById("content-carrito")


botonInicio.onclick = () =>{
    contentInicio.style.display = 'block';
    contentCarrito.style.display = 'none';
}

botonCarrito.onclick = () =>{
    contentInicio.style.display = 'none';
    contentCarrito.style.display = 'block';
}

/* SERVICIOS */

let btnAgregarServicio1 = document.getElementById("serv1")
let btnAgregarServicio2 = document.getElementById("serv2")
let btnAgregarServicio3 = document.getElementById("serv3")

let estilo = ".card-body button { display: inline-block; vertical-align: middle; -webkit-transform: perspective(1px) translateZ(0); transform: perspective(1px) translateZ(0); background-color: #333333; color: white; width: 98%; font-weight: bold; box-shadow: 0 0 1px #e18b34; overflow: hidden; -webkit-transition-duration: 0.5s; transition-duration: 0.5s; transition-property: color, background-color; } .card-body button:hover { background-color: #e18b34; color: white; -webkit-font-smoothing: antialiased; } .card-body button:focus { background: #e18b34; outline: 0; }"

function cambiarBtnAEliminar(boton){
    boton.innerText = "Eliminar servicio"
    boton.style.backgroundColor = "red"
}
function cambiarBtnAAgregar(boton){
    boton.innerText = "Agregar servicio"
    boton.style = estilo
}


btnAgregarServicio1.onclick = () => {
    if(document.getElementById("status-serv1").innerText == ("Desactivado")){
        document.getElementById("status-serv1").innerText = 'Activado'
        cambiarBtnAEliminar(btnAgregarServicio1)
        servicios[0].activarServicio()
        localStorage.setItem('Servicio de Armado',JSON.stringify(servicios[0]));
    }else{
        servicios[0].desactivarServicio()
        document.getElementById("status-serv1").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio1)
        localStorage.setItem('Servicio de Armado', JSON.stringify(servicios[0]));
    }
}




btnAgregarServicio2.onclick = () => {
    if(document.getElementById("status-serv2").innerText == "Desactivado"){
        document.getElementById("status-serv2").innerText = "Activado"
        cambiarBtnAEliminar(btnAgregarServicio2)
        servicios[1].activarServicio()
        localStorage.setItem('Servicio Envio a Domicilio', JSON.stringify(servicios[1]));
    }else{
        servicios[1].desactivarServicio()
        document.getElementById("status-serv2").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio2)
        localStorage.setItem('Servicio Envio a Domicilio', JSON.stringify(servicios[1]));
    }
}

btnAgregarServicio3.onclick = () => {
    if(document.getElementById("status-serv3").innerText == "Desactivado"){
        document.getElementById("status-serv3").innerText = "Activado"
        cambiarBtnAEliminar(btnAgregarServicio3)
        servicios[2].activarServicio()
        localStorage.setItem('Servicio de Puesta a Punto', JSON.stringify(servicios[2]));
    }else{
        servicios[2].desactivarServicio()
        document.getElementById("status-serv3").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio3)
        localStorage.setItem('Servicio de Puesta a Punto', JSON.stringify(servicios[2]));
    }
}


function retornarTotal(){
    let servicio1  = JSON.parse(localStorage.getItem("Servicio de Armado"))
    let servicio2  = JSON.parse(localStorage.getItem("Servicio Envio a Domicilio"))
    let servicio3  = JSON.parse(localStorage.getItem("Servicio de Puesta a Punto"))

    let checkServicios = []
    checkServicios.push(new Servicio(servicio1))
    checkServicios.push(new Servicio(servicio2))
    checkServicios.push(new Servicio(servicio3))

    alert(checkServicios[0].costo)

    let costoTotal = 0
    for (let i = 0; i < checkServicios.length; i++) {
        if(checkServicios[i].estaActivo)
            costoTotal += checkServicios[i].costo;
    }
    
    return costoTotal
}

let botonCosto = document.getElementById("botonCosto")
let TOTAL_AMOUNT = document.getElementById("costoTotal")

botonCosto.onclick = () => {
    TOTAL_AMOUNT.innerText = retornarTotal()    
}