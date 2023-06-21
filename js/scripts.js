let receitas;
// const baseUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp";
const baseUrl = "http://localhost:4000";

buscarReceitas();

function buscarReceitas() {
  const promessa = axios.get(`${baseUrl}/receitas`);
  promessa.then((resposta) => {
    console.log(resposta);
    popularReceitas(resposta);
  })
}

function buscarReceitaEspecifica(id) {
  document.querySelector(".receita").classList.remove("escondido");
  document.querySelector(".adicionar-receita").classList.add("escondido");

  const titulo = document.querySelector(".titulo-pagina-receita");
  const ingredientes = document.querySelector(".destaque-ingredientes");
  const preparos = document.querySelector(".destaque-preparo");

  const promessa = axios.get(`${baseUrl}/receitas/${id}`);
  promessa.then((resp) => {
    titulo.innerHTML = resp.data.titulo;
    ingredientes.innerHTML = resp.data.ingredientes;
    preparos.innerHTML = resp.data.preparo;
  });
}

function popularReceitas(resposta) {
  receitas = resposta.data;
  renderizarReceitas();
}

// Populando menu
function renderizarReceitas() {
  const ulReceitas = document.querySelector(".receitas");
  const contador = document.querySelector(".contador");
  ulReceitas.innerHTML = "";
  contador.innerHTML = `Qtd de receitas: ${receitas.length}`;
  for (let i = 0; i < receitas.length; i++) {
    ulReceitas.innerHTML += `
            <li onclick="buscarReceitaEspecifica('${receitas[i].id}')">
                <ion-icon name="fast-food-outline"></ion-icon>
                ${receitas[i].titulo}
            </li>   
        `;
  }
}

function adicionarReceita() {
  const titulo = document.querySelector(".nome-receita");
  const ingredientes = document.querySelector(".ingredientes-receita");
  const preparo = document.querySelector(".modo-preparo-receita");

  const novaReceita = {
    titulo: titulo.value,
    ingredientes: ingredientes.value,
    preparo: preparo.value,
  };

  const promessa = axios.post(`${baseUrl}/receitas`, novaReceita);

  promessa.then(() => {
    titulo.value = "";
    ingredientes.value = "";
    preparo.value = "";
    buscarReceitas();
  });
  promessa.catch(tratarErro);
}

function irAdicionarReceita() {
  document.querySelector(".receita").classList.add("escondido");
  document.querySelector(".adicionar-receita").classList.remove("escondido");
}

function tratarErro(erro) {
  if (erro.response.status === 409) {
    alert("Essa receita já existe!");
  } else {
    alert("Ocorreu um erro inesperado. Tente novamente.");
  }
}
