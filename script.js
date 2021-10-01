let botao = document.getElementById("botao");
botao.addEventListener("click", converterMoedas); //evento click
let select = document.getElementById("select-moedas");
select.addEventListener("change", trocaDeMoedas); //evento troca

async function converterMoedas() {
  let moedas = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
  ).then(function (resposta) {
    return resposta.json();
  });

  let dolar = moedas.USDBRL.high;
  let euro = moedas.EURBRL.high;
  //ATÉ AQUI É A PARTE RESPONSAVEL PELA ATUALIZAÇÃO DOS VALORES

  let inputValorEmReais = Number(document.getElementById("input").value);
  let inputMoedas = document.getElementById("input-moedas");
  let textoReal = document.getElementById("texto-real");

  if (select.value === "US$ Dolár Americano") {
    let valorEmDolares = inputValorEmReais / dolar;
    inputMoedas.innerHTML = valorEmDolares.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  if (select.value === "€ Euro") {
    let valorEmEuros = inputValorEmReais / euro;
    inputMoedas.innerHTML = valorEmEuros.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  }
  textoReal.innerHTML = inputValorEmReais.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

//Essa Função é responsavel por trocar a bandeira e o nome das moedas
function trocaDeMoedas() {
  let textoMoedas = document.getElementById("texto-moedas");
  let bandeiraMoedas = document.getElementById("bandeira-moedas");

  if (select.value === "US$ Dolár Americano") {
    textoMoedas.innerHTML = "Dólar Americano";
    bandeiraMoedas.src = "./img/eua.png";
  }
  if (select.value === "€ Euro") {
    textoMoedas.innerHTML = "Euro";
    bandeiraMoedas.src = "./img/euro.png";
  }
  converterMoedas();
}