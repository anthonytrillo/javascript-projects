document.addEventListener('DOMContentLoaded', () => {
    pintarProductos();

    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage();
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    };
});