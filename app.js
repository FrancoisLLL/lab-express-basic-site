const express = require("express");
const hbs = require("hbs");
const axios = require("axios")
const app = express();
const pokemon = [];
let nextUrl = "";
let userName = "Francois";

app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
    res.render("home.hbs", {
        username: userName
    });
})

app.get("/pokedex", async (req, res, next) => {

    axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
            renderPokemonApi(response);
            const pokemonSprites = [];
            Promise.all(response.data.results.map(pokemon => {

                    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name)
                        .then(response => {
                            Promise.resolve(1);
                            }
                        )
                        .catch(function (error) {
                            console.log(error);
                        })
                }))
                .then((responses) => {
                    console.log(responses);
                    res.render("pokedex.hbs", {
                        pokemon : pokemon,
                        username: userName,
                        sprites : pokemonSprites
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    })
// app.get("/pokedex/:name",(req,res,next) => {
//     console.log(req.params)

function renderPokemonApi(response) {
    pokemon.splice(0, pokemon.length, ...response.data.results);
}

app.listen(4000);