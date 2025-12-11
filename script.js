// --- LÓGICA DEL CONTACTO ---
const formulario = document.getElementById('form-contacto');
if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 
        var nombre = document.querySelector('input[name="nombre"]').value;
        var telefono = document.querySelector('input[name="telefono"]').value;
        var mensaje = document.querySelector('textarea[name="mensaje"]').value;
        var numeroAzura = "51903226700"; 
        var texto = "Hola Azura Shop ✨, soy " + nombre + "." + 
                    "%0AMi número es: " + telefono + 
                    "%0A%0AQuisiera cotizar esta idea: " + mensaje;
        var url = "https://wa.me/" + numeroAzura + "?text=" + texto;
        window.open(url, '_blank');
    });
}

// --- LÓGICA DEL CARRITO DE COMPRAS ---

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    
    total = total + precio;

    actualizarContador();
    
    mostrarAlerta("¡" + nombre + " fue agregado a tu canasta! 🛒", "¡Excelente!");
}

function actualizarContador() {
    document.getElementById('contador-carrito').innerText = "(" + carrito.length + ")";
    document.getElementById('total-precio').innerText = total.toFixed(2); 
}


function abrirCarrito() {
    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-carrito');
    
    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} <span>S/ ${producto.precio.toFixed(2)}</span>`;
        lista.appendChild(li);
    });

    modal.style.display = "flex";
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = "none";
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        mostrarAlerta("Tu carrito está vacío 🥺");
        return;
    }

    let numeroAzura = "51903226700";
    let mensaje = "Hola Azura, deseo realizar el siguiente pedido:%0A%0A" +
                  "*RESUMEN DE COMPRA (Web)*%0A" +
                  "--------------------------------%0A";

    carrito.forEach(prod => {
        mensaje += "• " + prod.nombre + " (S/ " + prod.precio.toFixed(2) + ")%0A";
    });

    mensaje += "--------------------------------%0A" +
               "*TOTAL A PAGAR: S/ " + total.toFixed(2) + "*%0A" +
               "--------------------------------%0A%0A" +
               "Quedo a la espera de los datos de pago.";

    let url = "https://wa.me/" + numeroAzura + "?text=" + mensaje;
    window.open(url, '_blank');
}

/* --- SISTEMA DE ALERTAS BONITAS --- */

function mostrarAlerta(mensaje, titulo = "¡Atención! 💖") {
    const modal = document.getElementById('modal-alerta');
    
    if (!modal) {
        alert(mensaje);
        return;
    }

    document.getElementById('mensaje-alerta').innerText = mensaje;
    document.getElementById('titulo-alerta').innerText = titulo;

    modal.style.display = 'flex';
}

function cerrarAlerta() {
    document.getElementById('modal-alerta').style.display = 'none';
}