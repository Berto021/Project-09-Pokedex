
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img')

//Essa parte é apenas da seleção de elementos do html
const form = document.querySelector('.form-search')
const inputSearch = document.querySelector('.input-search')
const buttonNext = document.querySelector('.button-next')
const buttonBack = document.querySelector('.button-back')


let searchPokemon = 1 // essa variável é o contador da pokedex, como tem o valor 1, vai começar pelo pokemon 1, bulbasaur

const fetchPokemon = async (pokemon) => { // função para utilizar a api pokemon, nessa funçao eu vou receber um valor, sejá id ou name do pokemon e ali em baixo vai retornar os dados dele
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

     if(APIResponse.status === 200){//  esse if  tem a função de confirmar se o status vai ser igual a 200( que é o valor de que deu positivo), caso o valor seja != de 200, ele vai ser um error, então não queremos error, se for error n vamos fazer nada
        const data = await APIResponse.json();
        return data;
    }
     }

    

 const renderPokemon =  async (pokemon) => {// essa é a função principal, aqui vamos pegar o pokemon lá na api e retornar seus dados separados para o nosso sistema

    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = ' '; // essa parte zera as informações, pois é antes da pesquisa ser efetuada, é para não ficar as informações do pokemon antigo na pesquisa do próximo pokemon
    pokemonImg.src = '#'

    const data = await fetchPokemon(pokemon) // usando a function fetchPokemon dentro da function render Pokemon
    if(data){
        pokemonName.innerHTML = data.name; // dentro do campo html armazenado na pokemonName vamos buscar a data(qual pokemon estamos pegando na api).name, ou sejá o nome do pokemon e assim por diante
        pokemonNumber.innerHTML = data.id;
        pokemonImg.setAttribute('src','#') // atribuímos o src aqui e setamos o valor vazio #
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];  // logo aqui vamos atualizar o valor src com o a informação da api(Em uma atualização futura colocarei um if para os pokemons cujo o id seja 649<, aí ele vai pegar o sprite da generation-viii)

        searchPokemon = data.id // isso aqui serve para atualizar o nosso valor para os botões de avançar e voltar funcionarem corretamente, exemplo, vc pesquisa o pokemon 25, pikachu, aí vai apertar avançar e vai pro raichu 26, sem isso ele iria pro número 2, ivysaur
        pokemonImg.style.bottom ="47%";
        pokemonImg.style.height = "18%"; // essa foi a minha maior gambiarra para os sprites não bugarem por conta da imagem de não encontrado
        pokemonImg.style.width = "30%";
        pokemonImg.style.left = "30.43%";
        
        
        

        inputSearch.value = '';//  isso aqui é para limpar o input de pesquisa depois de uma pesquisa, por isso o valor é '', ou sejá, vazio
    }else{
        pokemonName.innerHTML = `Não encontrado :/`;
        pokemonNumber.innerHTML = ` `
        pokemonImg.setAttribute('src','img/pikachu.gif') // dentro do atributo src colocamos a imagem(gif) do pikachu
        
        pokemonImg.style.left = "12.43%";
        pokemonImg.style.bottom ="47%"; // css no JavaScript para ajustar o css da imagem do pikachu
        pokemonImg.style.height = "26%";
        pokemonImg.style.width = "56%";
        pokemonImg.style.borderRadius = "4%";

        inputSearch.value = '';
       
    }
    
    
 }
 form.addEventListener('submit', (event)=> {

    event.preventDefault(); // se você não retirar o evento default de submit o teu site vai recarregar quando mandar a ação de submit
    renderPokemon(inputSearch.value.toLowerCase()); //função render pokemon, pegando o valor do input de pesquisa e transformando em lower casa, caso o usuário mande CHARIZARD, ou, CHariZArD, vai funcionar do mesmo jeito, sem esse lower case daria error e iria para tela do pikachu chorando ;(
    
 })

 buttonNext.addEventListener('click', ()=> { // adicionando um evento de click no botão
      searchPokemon += 1                // o valor do pokemon procurado +=1 ou sejá se o valor for 30, dps do click, vai ser 31
      renderPokemon(searchPokemon); //caso não atualizássemos a search pokemon ela iria para o valor 2,3 e assim por diante
 })
 buttonBack.addEventListener('click', ()=> {
    if (searchPokemon > 1){
    searchPokemon -= 1 //aqui é a mesma coisa do de cima, porém esse if  serve para que o usuário não consiga usar o botão de voltar quando o número estiver no 1, sem isso o contador iria para o negativo, -1,-2,-3
    renderPokemon(searchPokemon);
    }
})
 renderPokemon(searchPokemon)
 