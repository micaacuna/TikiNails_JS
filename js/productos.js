// FUNCIONALIDAD PARA PRODUCTOS.HTML ---- ENTREGA FINAL CON FETCH

// Clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const contenedorProductos = document.getElementById("contenedor-productos");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let listaProductos = [];

// Cargar productos desde archivo JSON
fetch("../js/productos.json")
    .then(res => res.json())
    .then(data => {
        listaProductos = data.map(item => new Producto(item.id, item.nombre, item.precio, item.imagen));
        renderizarProductos(listaProductos);
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });

function renderizarProductos(productos) {
    productos.forEach(producto => {
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
}

// Agregar producto al carrito
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar")) {
        const idProducto = parseInt(e.target.dataset.id);
        const productoSeleccionado = listaProductos.find(p => p.id === idProducto);
        if (productoSeleccionado) {
            carrito.push(productoSeleccionado);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarMensaje(`${productoSeleccionado.nombre} agregado al carrito`);
            actualizarContador();
        }
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
        mostrarCarrito();
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
