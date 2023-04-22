const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');
const buttonNext = document.querySelector('.button-next');
const buttonBack = document.querySelector('.button-back');


const pokemonType1 = document.querySelector('.pokemon-type1')
const pokemonType2 = document.querySelector('.pokemon-type2')
const pokemonHeight = document.querySelector('.pokemon-height')
const pokemonWeight = document.querySelector('.pokemon-weight')

const pokemonSpriteFront = document.querySelector('.pokemon-sprite-9-front')
const pokemonSpriteBack = document.querySelector('.pokemon-sprite-9-back')



const divide = num => num / 10;


var counterPokemon = 1; // essa variável é o contador da pokedex, como tem o valor 1, vai começar pelo pokemon 1, bulbasaur

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async pokemon => {
  // essa é a função principal, aqui vamos pegar o pokemon lá na api e retornar seus dados separados para o nosso sistema

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = ' ';
  pokemonImg.src = '#';
  


  const data = await fetchPokemon(pokemon); 
  if (data) {
    pokemonType1.innerHTML = data['types']['0']['type']['name'] 
    pokemonName.innerHTML = data.name; 
    pokemonNumber.innerHTML = data.id;
    pokemonImg.setAttribute('src', '#'); 
    pokemonImg.src = data.id < 650 ?
    data['sprites']['versions']['generation-v']['black-white']['animated'][
    'front_default']: data.id >= 650 ? data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']:

a
       
    if(data['types']['1'] != undefined){
       pokemonType2.innerHTML = data['types']['1']['type']['name']
       pokemonType2.style.display = 'block'
   }else  pokemonType2.style.display = 'none'
    const pokeHeight = data.height
    const pokeWeight = data.weight
    
    pokemonHeight.innerHTML = divide(pokeHeight)+' M'
    pokemonWeight.innerHTML = divide(pokeWeight)+' KG'

    pokemonSpriteFront.setAttribute('src','#')
    pokemonSpriteFront.src =data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']
    pokemonSpriteBack.setAttribute('src','#')
    pokemonSpriteBack.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_shiny']

    counterPokemon = data.id; 
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
  
  counterPokemon += 1; 
  renderPokemon(counterPokemon); 
});
buttonBack.addEventListener('click', () => {
  if (counterPokemon > 1) {
    counterPokemon -= 1;
    renderPokemon(counterPokemon);
  }
});
renderPokemon(counterPokemon);

