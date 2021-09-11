const fs = require('fs')
const $form = document.querySelector('#formNewProduct')
// const URL = 'https://eshop-deve.herokuapp.com/api/v2/orders';
// const Tokken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'

var ordenC, sku, nameP, cant, price;

$form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    ordenC = formData.get('ordenC')
    sku = formData.get('sku')
    nameP = formData.get('nameP')
    cant = formData.get('cant')
    price = formData.get('price')

    newOrden = {
        number: ordenC,
        items: {
            sku: sku,
            name: nameP,
            cant: cant,
            price: price
        }
    }

    console.log(newOrden)    
    añadirProductos(newOrden);
    
})

function añadirProductos(newOrden) {
    var obj = {
        table: []
    };

    fs.readFile('../json/orders.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            obj.table.push(newOrden)
            var json = JSON.stringify(obj);s
            fs.writeFile('../json/orders.json', json, 'utf8', callback);
        }
    })
}