const contenido = document.querySelector('#contenido');
const ordenes = document.querySelector('#ordenes');
const ordenNumero = document.querySelector('#ordenNumero');
const ordenTitulo = document.querySelector('#ordenTitulo');
const ordenCompra = document.querySelector('#ordenCompra');
const total = document.querySelector('#total');
const URL = 'https://eshop-deve.herokuapp.com/api/v2/orders';
var data;
var dataOrdenes = [];
var ordenDetalles = [];
var ordenN = [];

// ============================================================  Se realiza request

fetch(URL, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ',
        })
    })
    .then(res => res.json())
    .then(datos => {
        data = datos.orders
        simplificar(data)
    })
    .catch(err => console.log(err))

// ============================================================ Se añaden valores necesarios a las ordenes de compra

function simplificar(data) {
    for (let i = 0; i < data.length; i++) {
        const valor = data[i];
        var itemDetalle = valor.items
        var itemNecesary = [];
        for (let i = 0; i < itemDetalle.length; i++) {
            const item = itemDetalle[i];
            var obj = {
                sku: item.sku,
                name: item.name,
                quantity: parseInt(item.quantity),
                price: parseInt(item.price)
            }
            itemNecesary.push(obj)
        }
        ordenN.push(valor.number);
        ordenDetalles.push({
            number: valor.number,
            items: itemNecesary
        })
    }
    for (valor of ordenN) {
        ordenes.innerHTML += `
            <li><a class="dropdown-item" onclick="numeroOrden(${valor}); tabla()"> ${valor} </a></li>
        `
    }
}

// ============================================================ Se añaden listado del drop-menu

function numeroOrden(valor) {
    ordenNumero.innerHTML = `
        <div>Orden Numero:</div>
        <input type="hidden" id="ordenTitulo" value="${valor}"> ${valor} </input>
    `
    document.getElementById('ordenCompra').value = valor;
}

// ============================================================ Se crea tabla con elementos de ordenDetalles
function tabla() {
    var value = document.getElementById('ordenTitulo').value;
    console.log(value)
    var totalPrice = []
    var suma = 0;
    let i = 0;
    for (let dato of ordenDetalles) {
        console.log(dato)
        if (dato.number === value) {
            contenido.innerHTML = ''
            for (let valor of dato.items) {

                i += 1
                contenido.innerHTML += `
                <tr id="${dato.number}tr">
                    <th scope="row"> ${i} </th>
                    <td> ${valor.sku} </td>
                    <td> ${valor.name} </td>
                    <td> ${valor.quantity} </td>
                    <td> ${valor.price} </td>
                </tr>
            `
                totalPrice.push(valor.price)
            }
            break
        }
    }
    totalPrice.forEach(element => {
        suma += element;
    });
    total.innerHTML = '$' + suma
}


// ============================================================ Se obtienen datos de formulario y se añaden al ordenDetalles
const $form = document.querySelector('#formNewProduct')
var ordenC, sku, nameP, cant, price;

$form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    var newOrden = [];
    newOrden = {
        number: formData.get('ordenC'),
        items: [{
            sku: formData.get('sku'),
            name: formData.get('nameP'),
            quantity: parseInt(formData.get('cant')),
            price: parseInt(formData.get('price'))
        }]
    }
    pushArray(newOrden)
    tabla()
})


// ============================================================ Se añaden valores del formulario a ordenDetalles
function pushArray(newOrden) {
    var nOrden = newOrden.number
    for (let i = 0; i < ordenDetalles.length; i++) {
        const orden = ordenDetalles[i];
        if (nOrden === orden.number) {
            var nItem = newOrden.items[0];
            for (let i = 0; i < orden.items.length; i++) {
                const element = orden.items[i];
                if ((element.sku === nItem.sku) || (element.name === nItem.name)) {
                    element.quantity += nItem.quantity
                    element.price += nItem.price
                    return;
                }
            }
            orden.items.push(nItem)
        }
    }
}

// ============================================================ funcion para pagar OC

function pagar() {
    var x = document.getElementById("alerta");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function salir() {
    var value = document.getElementById('ordenCompra').value
    for (let i = 0; i < ordenDetalles.length; i++) {
        const element = ordenDetalles[i];
        if (element.number === value) {
            ordenDetalles.splice(i, 1)
        }
        contenido.innerHTML = ''
    }
    tabla()
    pagar()
}