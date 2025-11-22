document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('fib-formulario');
    const entrada = document.getElementById('count');
    const salida = document.getElementById('result');
    const mensaje = document.getElementById('mensaje');
    const limpiarBtn = document.getElementById('clear');
    const estadisticas = document.getElementById('stats');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        generarSecuencia();
    });

    limpiarBtn.addEventListener('click', () => {
        entrada.value = '';
        salida.innerHTML = '';
        estadisticas.innerHTML = '';
        mensaje.textContent = '';
    });

    entrada.addEventListener('input', () => {
        const n = parseInt(entrada.value);
        if (isNaN(n) || n < 1 || n > 50)
            entrada.setCustomValidity('Debe ser un número entre 1 y 50');
        else
            entrada.setCustomValidity('');
    });

    function generarSecuencia() {
        let n = parseInt(entrada.value);

        if (isNaN(n)) {
            mostrarMensaje("Introduce un número válido");
            return;
        }

        if (n < 1) {
            n = 1;
        } else if (n > 50) {
            n = 50;
}
        const secuencia = fibonacci(n);

        mostrarResultado(secuencia);
        mostrarMensaje("");
    }

    function fibonacci(n) {
        const lista = [];
        for (let i = 0; i < n; i++) {
            if (i === 0) lista.push(0);
            else if (i === 1) lista.push(1);
            else lista.push(lista[i - 1] + lista[i - 2]);
        }
        return lista;
    }

    function mostrarResultado(arr) {
        salida.innerHTML = '';
        estadisticas.innerHTML = '';

        let pares = 0, impares = 0, suma = 0;

        arr.forEach((v, i) => {
            const celda = document.createElement('div');
            celda.className = 'cell';

            const indice = document.createElement('div');
            indice.textContent = `F(${i + 1})`;

            const valor = document.createElement('div');
            valor.className = 'value ' + (v % 2 === 0 ? 'par' : 'impar');
            valor.textContent = v;

            const formula = document.createElement('div');
            formula.textContent = (i < 2) ? `(${v})`: `(${arr[i-2]} + ${arr[i-1]})`;

            celda.appendChild(indice);
            celda.appendChild(valor);
            celda.appendChild(formula);
            salida.appendChild(celda);

            suma += v;
            if (v % 2 === 0) pares++; else impares++;
        });

        estadisticas.innerHTML = `
            <p>Total: ${arr.length}</p>
            <p>Pares: ${pares}</p>
            <p>Impares: ${impares}</p>
            <p>Suma: ${suma}</p>
        `;
    }

    function mostrarMensaje(texto) {
        mensaje.textContent = texto; 
    }

    generarSecuencia();
});
