
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img')


const form = document.querySelector('.form-search')
const inputSearch = document.querySelector('.input-search')
const buttonNext = document.querySelector('.button-next')
const buttonBack = document.querySelector('.button-back')


let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

     if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
     }

    

 const renderPokemon =  async (pokemon) => {

    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = ' ';
    pokemonImg.src = '#'

    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.setAttribute('src','#')
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];  

        searchPokemon = data.id
        pokemonImg.style.bottom ="47%";
        pokemonImg.style.height = "18%";
        pokemonImg.style.width = "30%";
        pokemonImg.style.left = "30.43%";
        
        
        

        inputSearch.value = '';
    }else{
        pokemonName.innerHTML = `Não encontrado :/`;
        pokemonNumber.innerHTML = ` `
        pokemonImg.setAttribute('src','img/pikachu.gif')
        
        pokemonImg.style.left = "12.43%";
        pokemonImg.style.bottom ="47%";
        pokemonImg.style.height = "26%";
        pokemonImg.style.width = "56%";
        pokemonImg.style.borderRadius = "4%";

        inputSearch.value = '';
       
    }
    
    
 }
 form.addEventListener('submit', (event)=> {

    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());  
    
 })

 buttonNext.addEventListener('click', ()=> {
      searchPokemon += 1
      renderPokemon(searchPokemon);
 })
 buttonBack.addEventListener('click', ()=> {
    if (searchPokemon > 1){
    searchPokemon -= 1
    renderPokemon(searchPokemon);
    }
})
 renderPokemon(searchPokemon)
 