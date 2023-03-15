// defino mis tipos de monedas
// alert() funciona ;)
const tiposCambio = {
    ARS: { USD: 0.0026, EUR: 0.013, BRL: 0.086, PYG: 94.23 },
    USD: { ARS: 380.50, EUR: 0.852, BRL: 5.47, PYG: 5976.49 },
    EUR: { ARS: 410.50, USD: 1.172, BRL: 6.37, PYG: 6956.69 },
    BRL: { ARS: 70.50, USD: 0.183, EUR: 0.157, PYG: 1091.60 },
    PYG: { ARS: 35.55, USD: 0.00017, EUR: 0.00014, BRL: 0.00092 }
  };
  
  // para tener los elementos del DOM
  const monedaOrigen = document.getElementById("moneda-origen");
  const monedaDestino = document.getElementById("moneda-destino");
  const cantidad = document.getElementById("cantidad");
  const resultado = document.getElementById("resultado");
  const botonConvertir = document.getElementById("boton-convertir");
  
  // agrego op. de moneda al select de origen y destino

  for (let moneda in tiposCambio) {
    const opcionOrigen = document.createElement("option");
    opcionOrigen.value = moneda;
    opcionOrigen.textContent = moneda;
    monedaOrigen.appendChild(opcionOrigen);
  
    const opcionDestino = document.createElement("option");
    opcionDestino.value = moneda;
    opcionDestino.textContent = moneda;
    monedaDestino.appendChild(opcionDestino);
  }
  
  // convertir a la cantidad cuando hago click en el boton

  botonConvertir.addEventListener("click", function() {

    const monedaOrigenValor = monedaOrigen.value;
    const monedaDestinoValor = monedaDestino.value;
    const cantidadValor = parseFloat(cantidad.value);
  
    const tasa = tiposCambio[monedaOrigenValor][monedaDestinoValor];
    const resultadoValor = cantidadValor * tasa;
  
    resultado.value = resultadoValor.toFixed(2);
  
    // guardo la conversacion en mi storage
    const conversion = {
      monedaOrigen: monedaOrigenValor,
      monedaDestino: monedaDestinoValor,
      cantidad: cantidadValor,
      resultado: resultadoValor.toFixed(2)
    };
    const conversionesGuardadas = JSON.parse(localStorage.getItem("conversiones")) || [];
    conversionesGuardadas.push(conversion);
    localStorage.setItem("conversiones", JSON.stringify(conversionesGuardadas));
  });
  
  // conversaciones previas a la carga de mi pagina
  const conversionesGuardadas = JSON.parse(localStorage.getItem("conversiones")) || [];
  conversionesGuardadas.forEach(function(conversion) {
    const fila = document.createElement("tr");
    const columnaMonedaOrigen = document.createElement("td");
    columnaMonedaOrigen.textContent = conversion.monedaOrigen;
    fila.appendChild(columnaMonedaOrigen);
    const columnaMonedaDestino = document.createElement("td");
    columnaMonedaDestino.textContent = conversion.monedaDestino;
    fila.appendChild(columnaMonedaDestino);
    const columnaCantidad = document.createElement("td");
    columnaCantidad.textContent = conversion.cantidad;
    fila.appendChild(columnaCantidad);
    const columnaResultado = document.createElement("td");
    columnaResultado.textContent = conversion.resultado;
    fila.appendChild(columnaResultado);
    document.querySelector("#conversiones tbody").appendChild(fila);
});

// borrar las conver. guardadas cuando se haga click en el boton

const botonBorrar = document.getElementById("boton-borrar");

botonBorrar.addEventListener("click"), function() {

localStorage.removeItem("conversiones");
location.reload();

}
  