//FUNCIONALIDAD PARA PRODUCTOS.HTML ---- ENTREGA 2

// Clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// Lista de productos 
const listaProductos = [
    new Producto(1, "Esmalte Anush 143", 1500, "../img/esmalte_anush_143.png"),
    new Producto(2, "Bonder IBD", 2000, "../img/bonder_ibd.png"),
    new Producto(3, "Esmalte OPI Rojo", 2200, "../img/esmalte_opi_rojo.png"),
    new Producto(4, "Top Coat Meliné", 1800, "../img/top_coat_meline.png"),
    new Producto(5, "Kapping gel Navi", 3500, "../img/kapping_navi.png"),
    new Producto(6, "Esmalte Navi amarillo", 3000, "../img/color_navi.png"),
    new Producto(7, "Esmaltes Charm Limit Rosa", 6000, "../img/esmaltes_charm_rosa.png"),
    new Producto(8, "Esmaltes Charm Limit Azul", 6000, "../img/esmaltes_charm_azul.png")
];

// Mostrar productos en el DOM
const contenedorProductos = document.getElementById("contenedor-productos");

listaProductos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "producto";
    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p class="precio">$${producto.precio}</p>
        <p class="descripcion">${producto.nombre}</p>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(tarjeta);
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar producto al carrito
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar")) {
        const idProducto = parseInt(e.target.dataset.id);
        const productoSeleccionado = listaProductos.find(p => p.id === idProducto);
        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarMensaje(`${productoSeleccionado.nombre} agregado al carrito`);
        actualizarContador();
    }
});

// Mostrar mensaje en el DOM
function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerText = texto;
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}

function mostrarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-contenido");
    const listado = document.getElementById("carrito-listado");

    if (carritoGuardado.length === 0) {
        listado.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        listado.innerHTML = `
            <h4>Tu carrito:</h4>
            <ul>
                ${carritoGuardado.map(p => `<li>${p.nombre} - $${p.precio}</li>`).join("")}
            </ul>
        `;
    }

    contenedor.style.display = "block";
}

function actualizarContador() {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("contador-carrito");
    contador.innerText = carritoActual.length;
}

// Botón ocultar carrito
const botonOcultar = document.getElementById("ocultar-carrito");
if (botonOcultar) {
    botonOcultar.addEventListener("click", () => {
        document.getElementById("carrito-contenido").style.display = "none";
    });
}

// Botón vaciar carrito
const botonVaciar = document.getElementById("vaciar-carrito");
if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarMensaje("Carrito vaciado");
        actualizarContador();
        mostrarCarrito(); // Para actualizar la vista vacía
    });
}

// Botón ver carrito
const botonVer = document.getElementById("ver-carrito");
if (botonVer) {
    botonVer.addEventListener("click", () => {
        mostrarCarrito();
    });
}

// Inicializar contador al cargar la página
actualizarContador();
