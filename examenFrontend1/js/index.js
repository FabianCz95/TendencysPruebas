const contenido = document.querySelector('#contenido');
const ordenes = document.querySelector('#ordenes');
const ordenNumero = document.querySelector('#ordenNumero');
const ordenTitulo = document.querySelector('#ordenTitulo');

const URL = 'https://eshop-deve.herokuapp.com/api/v2/orders';

function extrae() {
    fetch(URL, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ',
            })
        })
        .then(res => res.json())
        .then(datos => {
            Ordenes(datos);
            
        }) 
        .catch(err=>console.log(err))
}

extrae();

function Ordenes(datos) {
    let data = datos.orders
    console.log(data)
    let ordenN = [];
    ordenes.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        const valor = data[i];
        ordenN.push(valor.number);
    }
    ordenes.innerHTML += ''
    for (valor of ordenN) {

        ordenes.innerHTML += `
            <li><a class="dropdown-item" onclick="numeroOrden(${valor})"> ${valor} </a></li>
        `
    }
    tabla(data)
}


function numeroOrden(valor) {
    ordenNumero.innerHTML = `
        <div>Orden Numero:</div>
        <input type="hidden" id="ordenTitulo" value="${valor}"> ${valor} </input>
    `
    extrae();
}


function tabla(datos) {
    var value = document.getElementById('ordenTitulo').value;
    let data = datos
    let i = 0;
    for(let dato of data) {
        if (dato.number === value) {
            contenido.innerHTML = ''
            for (let valor of dato.items) {
                
                i += 1
                contenido.innerHTML += `
                <tr>
                    <th scope="row"> ${i} </th>
                    <td> ${valor.sku} </td>
                    <td> ${valor.name} </td>
                    <td> ${valor.quantity} </td>
                    <td> ${valor.price} </td>
                </tr>
            `
            }
            break
        }
    }

    


}