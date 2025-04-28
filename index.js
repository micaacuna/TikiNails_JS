
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

function clienta () {
    let esClienta = confirm("¡Bienvenida a Tiki Nails? ¿Sos clienta regular? ")
    if (esClienta === false ){
        nombreclienta = prompt("Ingresá tu nombre");
        apellidoclienta = prompt("Ingresá tu apellido");
        Contacto = prompt("Ingresá un teléfono de contacto");
        servicioElegido = prompt("¿Qué servicio querés reservar " + listaServicios + "?");
    }
    else {
        nombreclienta = prompt("Ingresá tu nombre");
        apellidoclienta = prompt("Ingresá tu apellido");
        servicioElegido = prompt("¿Qué servicio querés reservar " + listaServicios + "?");
    }

}


const calcularPrecio = () => {
    let precio = 0;
    
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
            prompt("El servicio ingresado no es válido. Ingresalo nuevamente (Soft Gel, Kapping Gel, Esmaltado Semipermanente, Press On");
            break;
    }
    
    return precio;
}

clienta ()
let preciocalculado = calcularPrecio();

if (preciocalculado !== 0) {
    alert("Gracias por tu reserva, el servicio seleccionado es " + servicioElegido + " y el precio es $" + preciocalculado.toLocaleString());
    console.log(nombreclienta, apellidoclienta, servicioElegido, preciocalculado);
}