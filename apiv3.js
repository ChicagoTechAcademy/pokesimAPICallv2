import * as stats from './stats.js';

const player1PokeWebHook = document.getElementById('Player1Pokemon');
const player2PokeWebHook = document.getElementById('Player2Pokemon');

// const player1PokeMovesWebHook = document.getElementById('Player1PokemonMoves');
// const player2PokeMovesWebHook = document.getElementById('Player2PokemonMoves');

const player1HealthWebHook = document.getElementById('Player1Health');
const player2HealthWebHook = document.getElementById('Player2Health');

const loadPokemonFromAPI = async (id, playerNumber, pokeObject, level = 100) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokeman = await res.json();
	return displayPokemonToWebpage(pokeman, playerNumber, pokeObject, level);
};

const displayPokemonToWebpage = (thePokemon, playerNumber, pokeObject, level) => {
	const typeStr = thePokemon.types.map((type) => type.type.name).join(',');
	var typeArray = typeStr.split(',');

	const statNumStr = thePokemon.stats.map((stat) => stat.base_stat).join(',');
	var statArray = statNumStr.split(',');

	const learnableMoves = thePokemon.moves.map((moves) => moves.move.name).join(',');
	var moveArray = learnableMoves.split(',');

	var calcHealth = stats.calculateMaxHP(statArray[0], level);

	//Used to create the nice icons showing pokemon type
	var iconStringHolder = '';

	//set the object that was passed in: don't need to import it then!
	pokeObject.setPokemon(thePokemon, typeArray, statArray, level, learnableMoves, playerNumber);

	if (typeArray[1]) {
		iconStringHolder = `
        <div class="type-ico-grid">
            <div class="icon ${typeArray[0]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[0]}.svg"/>
            </div>
            <div class="icon ${typeArray[1]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[1]}.svg"/>
            </div>
        </div>
        `;
	} else {
		iconStringHolder = `
        <div class="type-ico-single">
            <div class="icon ${typeArray[0]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[0]}.svg"/>
            </div>
        </div>
        `;
	}

	const htmlString =
		`<h2 class="card-title">${thePokemon.name}  - #${thePokemon.id}</h2>
							` +
		iconStringHolder +
		`
		<div class="card-body row">
                        <div class="col col-4 my-auto">
                            <div class="card-text stats p1Stats">
                                <p>Level ${pokeObject.getLevel()}</p>
                                <p>Max Health: ${calcHealth}</p>
                                <p>Att: ${pokeObject.getAttack()}</p>
                                <p>SpAtt: ${pokeObject.getSpecialAttack()}</p>
                                <p>Def:  ${pokeObject.getDefense()}</p>
                                <p>SpDef: ${pokeObject.getSpecialDefense()}</p>
                                <p>Speed: ${pokeObject.getSpeed()}</p>
                            </div>
                        </div>

                        <div class="col-8 my-auto">
                            <img class="card-img pokemonImage" src="${
															thePokemon.sprites['front_default']
														}" alt="...">
                        </div>

                    </div>
			
				`;

	if (playerNumber == 1) {
		player1PokeWebHook.innerHTML = htmlString + player1PokeWebHook.innerHTML;
		player1HealthWebHook.value = calcHealth;
		player1HealthWebHook.max = calcHealth;
	} else if (playerNumber == 2) {
		player2PokeWebHook.innerHTML = htmlString + player2PokeWebHook.innerHTML;
		player2HealthWebHook.value = calcHealth;
		player2HealthWebHook.max = calcHealth;
	}



};

const loadMoveFromAPI = async (name, pokemonObject) => {
	const url = `https://pokeapi.co/api/v2/move/${name}`;
	fetch(url)
		.then((response) => response.json())
		.then((theMove) => {
			const dataMap = new Map();

			for (const [key, value] of Object.entries(theMove)) {
				dataMap.set(key, value);
			}

			pokemonObject.setMove(dataMap);
		})
		.catch((error) => {
			console.error('Error fetching move data:', error);
		});
};

const loadMoveDataToWebPage = (theMove, pokemonObject, attackIndex) => {
	var moveWebHook ="";
	if(attackIndex == 1 && pokemonObject.getPlayerNumber() == 1){
		moveWebHook = document.getElementById('p1move1');
	}else if(attackIndex == 2  && pokemonObject.getPlayerNumber() == 1){
		moveWebHook = document.getElementById('p1move2');
	}else if(attackIndex == 3  && pokemonObject.getPlayerNumber() == 1){
		moveWebHook = document.getElementById('p1move3');
	}else if(attackIndex == 4  && pokemonObject.getPlayerNumber() == 1){
		moveWebHook = document.getElementById('p1move4');
	}
	else if(attackIndex == 1 && pokemonObject.getPlayerNumber() == 2){
		moveWebHook = document.getElementById('p2move1');
	}else if(attackIndex == 2  && pokemonObject.getPlayerNumber() == 2){
		moveWebHook = document.getElementById('p2move2');
	}else if(attackIndex == 3  && pokemonObject.getPlayerNumber() == 2){
		moveWebHook = document.getElementById('p2move3');
	}else if(attackIndex == 4  && pokemonObject.getPlayerNumber() == 2){
		moveWebHook = document.getElementById('p2move4');
	}
	else{
		console.log("Error: Invalid move index")
	}
	const htmlString = `
						<div class="row">
							<div class="type-ico-single">
								<div class="icon ${theMove.type}">
									<img
										src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${theMove.type}.svg" />
								</div>
							</div>
						</div>

						<div class="col">
						${theMove.name}
						</div>
								`
	moveWebHook.innerHTML = htmlString + moveWebHook.innerHTML;
};

export { loadPokemonFromAPI, displayPokemonToWebpage, loadMoveDataToWebPage, loadMoveFromAPI };
