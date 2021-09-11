const skuOption = document.querySelector('#skuOption');
const nameItem = document.querySelector('#nameItem');
const priceItem = document.querySelector('#priceItem');

var items = [
    {
        sku: 1,
        name: 'producto' + 1,
        cant: 10,
        price: 15.00
    },
    {
        sku: 2,
        name: 'producto' + 2,
        cant: 20,
        price: 25.00
    },
    {
        sku: 3,
        name: 'producto' + 3,
        cant: 30,
        price: 35.00
    },
    {
        sku: 4,
        name: 'producto' + 4,
        cant: 40,
        price: 45.00
    },
]

skuOption.innerHTML += ''

for (let i = 0; i < items.length; i++) {
    const item = items[i].sku;
    const name = items[i].name;
    const price = items[i].price;
    skuOption.innerHTML += `
        <option value="${item}" nombre="${name}" id="${item}ID" price="${parseFloat(price)}"> ${item} </option>
    `
}


function searchName() {
    var item = document.getElementById('skuOption').value
    console.log(item)
    var name = document.getElementById(item + 'ID').getAttribute('nombre')
    var price = document.getElementById(item + 'ID').getAttribute('price')
    console.log(parseInt(price))
    document.getElementById('nameItem').value = name;
    // document.getElementById('nameItem').disabled = true
    document.getElementById('priceItem').value = price;

}

