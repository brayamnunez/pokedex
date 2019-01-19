//When DOM is ready...
$(document).ready(function () {

    //Variables to use;
    //Selectors;
    var pokemon_name_selector = $("#pokemon-name-input");
    var pokemon_button = $("#pokemon-fetch-button");
    var clear_pokedex = $("#clear-pokemon-fetch");
    var pokemon_info = $("#pokemon-info");
    var search_other_pokemon = $("#back-top-button");
    var divP_img = $("#loadPI");
    var pokemon_title;
    var pname;
    var img_counter = 1;
    var poke_container_obj;

    //Scroll up to pokedex top;
    search_other_pokemon.click(() => {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    //Clears the pokédex info and hide search other button;
    var empty_pokedex = clear_pokedex.click(() => {
        pokemon_info.empty();
        pokemon_info.fadeOut("slow");
        search_other_pokemon.hide();
        clear_pokedex.hide();
    });

    //Fetch All Pokémons;
    function getPokemons() {
        return fetch('https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/?offset=0&limit=1000');
    }

    //Fetch Specific Pokémon
    function getPokemon(pokemon_id) {
        return fetch('https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/' + pokemon_id);
    }

    //Fetch Description of the Pokémon
    function getGameIndices(p_o_pname) {
        return fetch("https://pokeapi-215911.firebaseapp.com/api/v2/pokemon-species/" + p_o_pname);
    }

    //Promise to call all Pokémons to show;
    getPokemons()
        .then(data => data.json())
        .then(p_data => {
            getAllPokemon(p_data);
        });

    //If clicks on a Pokémon img, will look for that Pokémon Info;
    $(document).on("click", "img.poke_all_img", function (e) {
        id_pokemon = parseInt(e.currentTarget.id);
        id_pokemon += 1;
        getPokemon(id_pokemon)
            .then(data => data.json())            
            .then(p_o_data => {
                getOnePokemon(p_o_data);
            })
            .catch(() => {
                alert("Error with PokéAPI. Couldn't fetch Pokémon info.");
                clear_pokemon_input()
            })
    });

    function getOnePokemon(r_pokemon_fetch) {
        upperLetter = r_pokemon_fetch.name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });

        var pokemon_fetch_desc = {
            "async": true,
            "crossDomain": true,
            "url": "https://pokeapi-215911.firebaseapp.com/api/v2/pokemon-species/" + r_pokemon_fetch.name,
            "method": "GET",
            "headers": {},
            beforeSend: function () {
                $('#p_loading').fadeIn("slow");
                $('#poke-gif').fadeIn("slow");
                pokemon_name_selector.hide();
                pokemon_button.hide();
            }
        }

        $.ajax(pokemon_fetch_desc).done(function (response_pokemon) {
            var array_lang = response_pokemon.flavor_text_entries;

            //go through the elements of the lang description array and grab the description in english only;
            for (i in array_lang) {
                if (array_lang[i].language.name == "en") {
                    var p_desc = response_pokemon.flavor_text_entries[i].flavor_text;
                }
            }

            var pokemon_regions = [];
            var pokemon_regions_array = response_pokemon.pokedex_numbers;

            var game_indices = [];
            var game_indices_array = r_pokemon_fetch.game_indices;
            
            //Go through the indices games and put each element into a new array to show it later;
            for (o in game_indices_array) {
                game_indices.push(" " + game_indices_array[o].version.name);
            }

            //Go through the regions pokemon may be encounter and put each element into a new array to show it later;
            for (i in pokemon_regions_array) {
                pokemon_regions.push(" " + pokemon_regions_array[i].pokedex.name);
            }

            p_o_height = r_pokemon_fetch.height / 10;

            //array with "pokemon moves";
            var p_o_moves = [];

            //pushing all the moves to the array;
            p_o_moves.push(
                r_pokemon_fetch.moves[0].move.name,
                r_pokemon_fetch.moves[1].move.name,
                r_pokemon_fetch.moves[2].move.name,
                r_pokemon_fetch.moves[3].move.name);

            poke_container_obj = build_pokeinfo_cont(upperLetter,
                r_pokemon_fetch.types[0].type.name,
                p_desc,
                r_pokemon_fetch.sprites.back_default,
                r_pokemon_fetch.sprites.front_default,
                r_pokemon_fetch.weight,
                p_o_height,
                game_indices,
                pokemon_regions,
                response_pokemon.generation.name,
                response_pokemon.habitat.name,
                p_o_moves)

            var pokemonFetch = $("#pokemon-info").append(poke_container_obj);
            pokemon_info.fadeIn("slow");
            $('#p_loading').hide();
            $('#poke-gif').hide();
            $('body, html').animate({ scrollTop: $("#pokedex-container #pokedex-container-info").last().offset().top }, 1000);
            search_other_pokemon.show();
            clear_pokedex.show();
            pokemon_name_selector.show();
            pokemon_button.show();
            clear_pokemon_input();
        });
    }

    function getAllPokemon(response_pokemon_path) {
        for (i = 0; i <= response_pokemon_path.results.length - 143; i++) {
            img_path = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

            pname = response_pokemon_path.results[i].name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });

            p_pic = img_path + img_counter + ".png";

            img_template = `
                <div class='poke_img_block' id="div_layout ${i.toString()}">
                    <h3 id="p_name">${pname}</h3>
                    <img title='Click [${pname}] to see info.' src='${p_pic}' class='poke_all_img' id='${i.toString()}'></img>
                </div>
            `;
            img_counter++;
            divP_img.append(img_template);
        }
        //console.log("indice: " + i);
    };

    function clear_pokemon_input() {
        pokemon_name_selector.val("");
    }

    function build_pokeinfo_cont(poke_name, poke_type, poke_desc, sprite_back, sprite_front,
        poke_weight, poke_height, game_indice, pokemon_regions, generation, habitat, moves = []) {
        var records = `
            <div id="pokedex-container-info">
                <h4 id="title-pokeinfo-pokemon">Pokémon Info.</h4>                        
                    <div id="querys-name-type">
                        <h2 id="pokemon-title">${poke_name}, ${poke_type}.</h2>                                
                            <div id="desc_img">
                                <p id="p_desc">${poke_desc}</p>                                    
                            </div>
                            <div id="pokemon-img">
                                <img class="responsive-img" src="${sprite_back}"></img>
                                <img class="responsive-img" src="${sprite_front}"></img>
                            </div>
                            <p class="p-desc-weight-height">Weight (pounds): ${poke_weight}</p>
                            <p class="p-desc-weight-height">Height (meters): ${poke_height}</p>                            
                            <h2 id="pokemon-title">Regions</h2>                            
                            <p id="p_pokeinfo">${pokemon_regions}.</p>
                            <h2 id="pokemon-title">Habitat</h2>
                            <p id="p_pokeinfo">${habitat}.</p>
                            <h2 id="pokemon-title">Generation</h2>
                            <p id="p_pokeinfo">${generation}.</p>
                            <h2 id="pokemon-title">Appearances</h2>
                            <p id="p_pokeinfo">${game_indice}.</p>
                    </div>                                                        
                    <br>                
                    <div id="querys-moves">
                        <h2 class="title-pokeinfo">First 4 Moves</h2>
                        <p class="p_info">${moves[0]}</p>                    
                        <p class="p_info">${moves[1]}</p>
                         <p class="p_info">${moves[2]}</p>
                        <p class="p_info">${moves[3]}</p>
                    </div>
            </div><hr><hr><hr>`;
        return records;
    }

    //When Search Pokémon is clicked, triggers the search;
    function pokemon_search_button() {
        //grab the name of the pokemon ;
        p_name_string = String(pokemon_name_selector.val());

        if (p_name_string == '') {
            alert("No Pokémon was entered. Please enter a Pokémon name.");
        } else {

            getPokemon(p_name_string.toLowerCase())
                .then(data => data.json())
                .then(p_o_data => {
                    getOnePokemon(p_o_data);
                })
                .catch(() => {
                    alert("Error with PokéAPI. Couldn't fetch Pokémon info.")
                    clear_pokemon_input()
                })
        }
    }

    //If enter is pressed when typing a Pokémon name, do the search;
    $(document).keypress(function (e) {
        if (e.which === 13) {
            event.preventDefault();
            pokemon_search_button();
        }
    });

    //If the Pokémon search button is clicked, do the search;
    $(pokemon_button).click(function (e) {
        pokemon_search_button();
    });


});