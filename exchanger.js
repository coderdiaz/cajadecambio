(function(){
    //https://min-api.cryptocompare.com/data/price?fsym=MXN&tsyms=BTC#
var changeValue, 
    inputA = document.querySelector("#inputA"),
    inputB = document.querySelector("#inputB"),
    selectA = document.getElementById("selectA"),
    selectB = document.getElementById("selectB");

//Escuchar el cambio en selector de moneda 1
selectA.onchange = function getSelectA(){
    var label = document.querySelector('label[for="inputA"]');
    console.log(label);
    label.innerHTML =  "Cantidad de " + selectA.value;
    callAPI(inputA, inputB, selectA, selectB);
 }
 
 //Escuchar el cambio en selector de moneda 2
 selectB.onchange = function getSelectB(){
    var label = document.querySelector('label[for="inputB"]');
    console.log(label);
    label.innerHTML =  "Cantidad de " + selectB.value;
    callAPI(inputB, inputA, selectB, selectA);
 }

//Escuchar el cambio en moneda 1
inputA.addEventListener('change', function(){
    callAPI(inputA, inputB, selectA, selectB);
});

//Escuchar el cambio en moneda 2
inputB.addEventListener('change', function(){
    callAPI(inputB, inputA, selectB, selectA);
});

// Hacer conversion
function convertir(tasa, moneda){
    return tasa * moneda;
}

//Desplegar resultado
function desplegar(valor, inputControl){
    inputControl.value = valor;
}

//Hacer llamada a API y procesar cambio
function callAPI(inputCaller, inputTarget, selectCaller, selectTarget){

    var cantidad = inputCaller.value;
    var selectedCurrency = selectCaller.value;
    var targetCurrency = selectTarget.value;

    var url = `https://min-api.cryptocompare.com/data/price?fsym=${selectedCurrency}&tsyms=${targetCurrency}#`;
    
        console.log(cantidad);
        console.log(url);
    
        fetch(url).then(response => {
            if (response.ok){
                return Promise.resolve(response);
            }else{
                return Promise.reject(new Error("No sirve"));
            }
        }).then(response => response.json()).then(data => {
            var valor = convertir(data[targetCurrency], cantidad);
            desplegar(valor, inputTarget);
            inputTarget.focus();
        })
        .catch(error => { console.log(`Error: ${error}`)});

}





})()