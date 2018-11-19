//When DOM is ready...
$(document).ready(function () {

    //Variables to use;
    //Selectors;
    var pokemon_name_selector = $("#pokemon-name-input");
    var pokemon_button = $("#pokemon-fetch-button");
    var clear_pokedex = $("#clear-pokemon-fetch");
    var pokemon_info = $("#pokemon-info");
    var search_other_pokemon = $("#back-top-button");

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
        

    //When 'Search Pokémon is clicked, triggers the search;
    var pokemon_search_button = pokemon_button.click (() => {

        //grab the name of the pokemon ;
        p_name_string = String(pokemon_name_selector.val());        
        
        if (p_name_string == '') {
            alert("No Pokémon was entered. Please enter a Pokémon name.");
        } else {
            var pokemon_fetch_set = {
                "async": true,
                "crossDomain": true,
                "url": "https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/" + p_name_string.toLowerCase(),
                "method": "GET",
                "headers": {},
                "dataType": "json"
            }

            $.ajax(pokemon_fetch_set).done(function (response_pokemon) {
                
                var pokemon_fetch_desc = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://pokeapi-215911.firebaseapp.com/api/v2/pokemon-species/" + response_pokemon.name,
                    "method": "GET",
                    "headers": {},
                    beforeSend: function(){                        
                        $('#p_loading').fadeIn("slow");
                        $('#poke-gif').fadeIn("slow");
                        pokemon_name_selector.hide();
                        pokemon_button.hide();
                    }
                }

                $.ajax(pokemon_fetch_desc)    
                .done(function (response_pokemon_desc) {
                    
                    //show the english description of the pokemon fetched;                
                    var array_lang = response_pokemon_desc.flavor_text_entries;
                    var game_indices_array = response_pokemon.game_indices;
                    var game_indices = [];

                    //go through the elements of the lang description array and grab the description in english only;
                    for (i in array_lang) {
                        if (array_lang[i].language.name == "en") {
                            var p_desc = response_pokemon_desc.flavor_text_entries[i].flavor_text;
                        }
                    }

                    //Go through the indices games and put each element into a new array to show it later;
                    for (o in game_indices_array) {
                        game_indices.push(" " + game_indices_array[o].version.name);
                    }
                    
                    upperLetter = response_pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase();
                    });
                    
                    var records = `
                    <div id="pokedex-container-info">
                        <h4 id="title-pokeinfo-pokemon">Pokémon Info.</h4>                        
                        <div id="querys-name-type">
                                <h2 id="pokemon-title">${upperLetter}, ${response_pokemon.types[0].type.name}.</h2>                                
                                <div id="desc_img">
                                    <p id="p_desc">${p_desc}</p>                                    
                                </div>
                                <div id="pokemon-img">
                                    <img class="responsive-img" src="${response_pokemon.sprites.back_default}"></img>
                                    <img class="responsive-img" src="${response_pokemon.sprites.front_default}"></img>
                                </div>
                                <p class="p-desc-weight-height">Weight (pounds): ${response_pokemon.weight}</p>
                                <p class="p-desc-weight-height">Height (meters): ${response_pokemon.height / 10}</p>
                                <h2 id="pokemon-title">Appearances</h2>
                                <p id="p_indices">${game_indices}.</p>                                
                            </div>                                                        
                        <br>                
                        <div id="querys-moves">
                            <h2 class="title-pokeinfo">Moves</h2>
                            <p class="p_info">${response_pokemon.moves[0].move.name}</p>                    
                            <p class="p_info">${response_pokemon.moves[1].move.name}</p>
                            <p class="p_info">${response_pokemon.moves[2].move.name}</p>
                            <p class="p_info">${response_pokemon.moves[3].move.name}</p>
                        </div>
                    </div><hr><hr><hr>`;

                    //appends all the registries: pokemon into the div;
                    var pokemonFetch = $("#pokemon-info").append(records);
                    pokemon_info.fadeIn("slow");
                    //clears the pokémon name;
                    pokemon_name_selector.val('');
                    $('#p_loading').hide();
                    $('#poke-gif').hide();
                    $('body, html').animate({ scrollTop: $("#pokedex-container #pokedex-container-info").last().offset().top }, 1000);
                    search_other_pokemon.show();
                    clear_pokedex.show();
                    pokemon_name_selector.show();
                    pokemon_button.show();

                }).fail(() => {//if the ajax call fail looking for pokémon description;
                    alert("No Description associated for that Pokémon.")
                });

            }).fail(() => {//if the ajax call fail looking for the pokémon itself;
                alert("Please check your Pokémon Spelling, or maybe that Pokémon does not exist.");
            });
        }
    });
});