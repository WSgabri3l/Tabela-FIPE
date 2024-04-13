const carBrandField = document.querySelector("#brand");

const carModelField = document.querySelector("#model");
carModelField.disabled = true;

const carYearField = document.querySelector("#year");
carYearField.disabled = true;

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var codes = [];
var codes_2 = [];
var codes_3 = [];

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var brands = [];
var models = [];
var year = [];

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var urlBrand = "https://parallelum.com.br/fipe/api/v1/carros/marcas";
var urlModels = "";
var urlYear = "";
var valueUrl = "";

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function callUrl(url){

    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();

    return JSON.parse(request.response);

}

function makeList(array, response){

    for (let index = 0; index < response.length; index++) {
        
        array.push(response[index].nome);
        
        //console.log(list);

    }
}

function fillFields(array, codes, field){
    
    for (let index = 0; index < array.length; index++) {
        
        let option = document.createElement("option");

        option.value = codes[index];
        option.textContent = array[index];

        field.appendChild(option);
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var carBrands = callUrl(urlBrand);
makeList(brands, carBrands);

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Adicionando os códigos.
for (let index = 0; index < carBrands.length; index++) {
        
    codes.push(carBrands[index].codigo);

    //console.log(codes);
}

//Preenchendo os campos.

fillFields(brands, codes, carBrandField);

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

carBrandField.addEventListener("change", (event) =>{

    //Criação da URL e captura de dados.

    urlModels = "https://parallelum.com.br/fipe/api/v1/carros/marcas/" + carBrandField.value + "/modelos";

    var carModels = callUrl(urlModels);

    console.log(carModels);

    //Alocando os valores a uma variável.

    makeList(models, carModels.modelos);

    //Adicionando os códigos.

    for (let index = 0; index < carModels.modelos.length; index++) {
        
    codes_2.push(carModels.modelos[index].codigo);

    }

    //Preenchendo campos.

    fillFields(models, codes_2, carModelField);

    carModelField.disabled = false;

});

carModelField.addEventListener("change", (event) =>{

    //Criação da URL e captura de dados.

    urlYear = "https://parallelum.com.br/fipe/api/v1/carros/marcas/" + carBrandField.value + "/modelos";

    var carYear = callUrl(urlYear);

    //Alocando os valores a uma variável.

    makeList(year, carYear.anos);

    //Adicionando os códigos.

    for (let index = 0; index < carYear.anos.length; index++) {
        
    codes_3.push(carYear.anos[index].codigo);

    }

    //Preenchendo campos.

    fillFields(year, codes_3, carYearField);

    carYearField.disabled = false;
    
});

carYearField.addEventListener("change", (event) =>{

    valueUrl = "https://parallelum.com.br/fipe/api/v1/carros/marcas/" + carBrandField.value + "/modelos/" + carModelField.value + "/anos/" + carYearField.value;

    console.log("https://parallelum.com.br/fipe/api/v1/carros/marcas/" + carBrandField.value + "/modelos/" + carModelField.value + "/anos/" + carYearField.value);

    var carValue = callUrl(valueUrl)

    console.log(carValue);
});