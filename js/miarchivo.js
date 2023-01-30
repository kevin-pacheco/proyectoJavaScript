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
    obtenerCosto(){
        return this.costo
    }
}

const servicios = []

servicios.push(new Servicio({nombre:"Servicio de Armado",costo:2000,estaActivo:false}));
servicios.push(new Servicio({nombre:"Servicio Envio a Domicilio",costo:500,estaActivo:false}));
servicios.push(new Servicio({nombre:"Servicio de Puesta a Punto",costo:700,estaActivo:false}));

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
for (const servicio of servicios) {
    console.log("Lo guardo asi: " + JSON.stringify(servicio))
    guardarLocal(servicio.nombre, JSON.stringify(servicio));
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
        console.log("jotason: " + localStorage.getItem("Servicio de Armado"))
        let servicio1  = new Servicio(JSON.parse(localStorage.getItem("Servicio de Armado")))
        servicio1.activarServicio()
        localStorage.setItem('Servicio de Armado',JSON.stringify(servicio1));
    }else{
        let servicio1  = new Servicio(JSON.parse(localStorage.getItem("Servicio de Armado")))
        servicio1.desactivarServicio()
        document.getElementById("status-serv1").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio1)
        localStorage.setItem('Servicio de Armado', JSON.stringify(servicio1));
    }
    
}




btnAgregarServicio2.onclick = () => {
    if(document.getElementById("status-serv2").innerText == "Desactivado"){
        document.getElementById("status-serv2").innerText = "Activado"
        cambiarBtnAEliminar(btnAgregarServicio2)
        let servicio2 = new Servicio(JSON.parse(localStorage.getItem("Servicio Envio a Domicilio")))
        servicio2.activarServicio()
        localStorage.setItem('Servicio Envio a Domicilio', JSON.stringify(servicio2));
    }else{
        let servicio2 = new Servicio(JSON.parse(localStorage.getItem("Servicio Envio a Domicilio")))
        servicio2.desactivarServicio()
        document.getElementById("status-serv2").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio2)
        localStorage.setItem('Servicio Envio a Domicilio', JSON.stringify(servicio2));
    }
}

btnAgregarServicio3.onclick = () => {
    if(document.getElementById("status-serv3").innerText == "Desactivado"){
        document.getElementById("status-serv3").innerText = "Activado"
        cambiarBtnAEliminar(btnAgregarServicio3)
        let servicio3 = new Servicio(JSON.parse(localStorage.getItem("Servicio de Puesta a Punto")))
        servicio3.activarServicio()
        localStorage.setItem('Servicio de Puesta a Punto', JSON.stringify(servicio3));
    }else{
        let servicio3 = new Servicio(JSON.parse(localStorage.getItem("Servicio de Puesta a Punto")))
        servicio3.desactivarServicio()
        document.getElementById("status-serv3").innerText = "Desactivado"
        cambiarBtnAAgregar(btnAgregarServicio3)
        localStorage.setItem('Servicio de Puesta a Punto', JSON.stringify(servicio3));
    }
}


function retornarTotal(){
    let servicio1  = new Servicio(JSON.parse(localStorage.getItem("Servicio de Armado")))
    let servicio2  = new Servicio(JSON.parse(localStorage.getItem("Servicio Envio a Domicilio")))
    let servicio3  = new Servicio(JSON.parse(localStorage.getItem("Servicio de Puesta a Punto")))

    return (servicio1.estaActivo?servicio1.obtenerCosto():0) + (servicio2.estaActivo?servicio2.obtenerCosto():0) + (servicio3.estaActivo?servicio3.obtenerCosto():0) 
}

let botonCosto = document.getElementById("botonCosto")
let TOTAL_AMOUNT = document.getElementById("costoTotal")

botonCosto.onclick = () => {
    TOTAL_AMOUNT.innerText = retornarTotal()    
}