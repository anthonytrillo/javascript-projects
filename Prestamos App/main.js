const formulario = document.getElementById("form");

const nombre = document.getElementById("firstName");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");
const monto = document.getElementById("amount");
const cuotas = document.getElementById("fees");


const montoFinal = document.getElementById("finalAmount");
const cuotasFinales = document.getElementById("finalFees");
const intereses = document.getElementById("interests");
const totalADevolver = document.getElementById("totalAmount");

const tasa = 0.01; // 1%

const obtenerCuotaPrestamo = () => {
  const cuotaPrestamo = tasa * monto.value / (1 - (1+tasa) ** - cuotas.value);
  obtenerTotal(cuotaPrestamo);
};

const obtenerTotal = (cuotaPrestamo) => {
  const total = Math.ceil(cuotaPrestamo) * cuotas.value;

  // Le pasamos los valores a nuestra factory para poder construir objetos
  const prestamo = construirPrestamo(monto.value, cuotas.value, total - monto.value, total);

  // Mostramos el préstamo al usuario
  pintarPrestamo(prestamo);

  // Guardamos el préstamo en el Storage
  guardarPrestamoStorage(prestamo);
};

const pintarPrestamo = (prestamo) => {
  montoFinal.textContent = `$${prestamo.monto}`;
  cuotasFinales.textContent = prestamo.cuotas;
  intereses.textContent = `$${prestamo.intereses}`;
  totalADevolver.textContent = `$${prestamo.total}`;
};

// Usamos una función que actua como factory para crear objetos
const construirPrestamo = (montoValue, cuotasValue, interesesValue, totalValue) => {
  return {
    monto: montoValue,
    cuotas: cuotasValue,
    intereses: interesesValue,
    total: totalValue
  }
};

const guardarPrestamoStorage = (prestamo) => {
  localStorage.setItem("prestamo", JSON.stringify(prestamo));
};

const obtenerPrestamoStorage = () => {
  const prestamoStorage = JSON.parse(localStorage.getItem("prestamo"));
  return prestamoStorage;
};

const obtenerPrestamo = () => {
  // Validamos que exista el préstamo en el localStorage
  // Si existe lo mostramos, sino, no hacemos nada
  if (localStorage.getItem("prestamo")) {
    const prestamoStorage = obtenerPrestamoStorage();
    console.log(prestamoStorage)
    // Como ya tenemos una función que muestra el préstamo, la usamos
    pintarPrestamo(prestamoStorage);
  }
};

// Listeners
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Comprobamos si el elemento tiene restricciones y si las cumple,
  // si las cumple osea que los campos estén llenos entra al if, sino, muestra las validaciones
  if (formulario.checkValidity()) {
    obtenerCuotaPrestamo();
  }

});

// Utilizo el evento DOMContentLoaded para invocar funciones cada vez que la página se recargue
document.addEventListener("DOMContentLoaded", obtenerPrestamo);