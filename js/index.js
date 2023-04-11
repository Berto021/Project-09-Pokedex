const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');
const buttonNext = document.querySelector('.button-next');
const buttonBack = document.querySelector('.button-back');

let searchPokemon = 1; // essa variável é o contador da pokedex, como tem o valor 1, vai começar pelo pokemon 1, bulbasaur

const fetchPokemon = async (pokemon) => {
  // função para utilizar a api pokemon, nessa funçao eu vou receber um valor, sejá id ou name do pokemon e ali em baixo vai retornar os dados dele
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  // essa é a função principal, aqui vamos pegar o pokemon lá na api e retornar seus dados separados para o nosso sistema

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = ' ';
  pokemonImg.src = '#';

  const data = await fetchPokemon(pokemon); 
  if (data) {
    pokemonName.innerHTML = data.name; 
    pokemonNumber.innerHTML = data.id;
    pokemonImg.setAttribute('src', '#'); 
    pokemonImg.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]; // logo aqui vamos atualizar o valor src com o a informação da api(Em uma atualização futura colocarei um if para os pokemons cujo o id seja 649<, aí ele vai pegar o sprite da generation-viii)

    searchPokemon = data.id; // isso aqui serve para atualizar o nosso valor para os botões de avançar e voltar funcionarem corretamente, exemplo, vc pesquisa o pokemon 25, pikachu, aí vai apertar avançar e vai pro raichu 26, sem isso ele iria pro número 2, ivysaur
    pokemonImg.style.bottom = '47%';
    pokemonImg.style.height = '18%'; // essa foi a minha maior gambiarra para os sprites não bugarem por conta da imagem de não encontrado
    pokemonImg.style.width = '30%';
    pokemonImg.style.left = '30.43%';

    inputSearch.value = ''; 
  } else {
    pokemonName.innerHTML = `Não encontrado :/`;
    pokemonNumber.innerHTML = ` `;
    pokemonImg.setAttribute('src', 'img/pikachu.gif'); 

    pokemonImg.style.left = '12.43%';
    pokemonImg.style.bottom = '47%'; // css no JavaScript para ajustar o css da imagem do pikachu
    pokemonImg.style.height = '26%';
    pokemonImg.style.width = '56%';
    pokemonImg.style.borderRadius = '4%';

    inputSearch.value = '';
  }
};
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  renderPokemon(inputSearch.value.toLowerCase()); 
});

buttonNext.addEventListener('click', () => {
  
  searchPokemon += 1; 
  renderPokemon(searchPokemon); 
});
buttonBack.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
renderPokemon(searchPokemon);
