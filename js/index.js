//FUNCIONALIDAD PARA INDEX -- ENTREGA 1


let servicios = [
    {Servicio:"Soft Gel", Precio: 16000 },
    {Servicio: "Kapping Gel" , Precio: 14000},
    {Servicio: "Esmaltado Semipermanente" , Precio: 12000},
    {Servicio: "Press On" , Precio: 10000},
]

let nombreclienta = 0
let apellidoclienta = 0
let listaServicios = "";
let servicioElegido = "";

for (let item of servicios) {
    listaServicios += item.Servicio + ", ";
}

listaServicios = listaServicios.slice(0, -2);
function clienta() {
    let esClienta = confirm("¡Bienvenida a Tiki Nails! ¿Sos clienta regular?");
    
    if (esClienta === false) {
        do {
            nombreclienta = prompt("Ingresá tu nombre");
        } while (!nombreclienta || nombreclienta.trim() === "");
    
        do {
            apellidoclienta = prompt("Ingresá tu apellido");
        } while (!apellidoclienta || apellidoclienta.trim() === "");
    
        do {
            Contacto = prompt("Ingresá un teléfono de contacto");
        } while (!Contacto || Contacto.trim() === "");
    } 
    else {
        do {
            nombreclienta = prompt("Ingresá tu nombre");
        } while (!nombreclienta || nombreclienta.trim() === "");
    
        do {
            apellidoclienta = prompt("Ingresá tu apellido");
        } while (!apellidoclienta || apellidoclienta.trim() === "");
    }
}

const calcularPrecio = () => {
    let precio = 0;
    
    do {
        if (servicioElegido.trim() === "") {
            servicioElegido = prompt("No se ha ingresado un servicio. Por favor, elige uno: " + listaServicios);
        }
        
        switch (servicioElegido.toLowerCase()) {
            case "soft gel":
            case "kapping gel":
            case "esmaltado semipermanente":
            case "press on":
                for (let item of servicios) {
                    if (item.Servicio.toLowerCase() === servicioElegido.toLowerCase()) {
                        precio = item.Precio;
                        break;
                    }
                }
                break;
            default:
                servicioElegido = prompt("El servicio ingresado no es válido. Por favor, elige uno de los siguientes: " + listaServicios);
                break;
        }
    } while (precio === 0); 
    
    return precio;
}

clienta ()
let preciocalculado = calcularPrecio();

if (preciocalculado !== 0) {
    alert("Gracias por tu reserva, el servicio seleccionado es " + servicioElegido + " y el precio es $" + preciocalculado.toLocaleString());
    console.log(nombreclienta, apellidoclienta, servicioElegido, preciocalculado);
}