const express = require('express');
const path = require('path');
const {port, host} = require('./config.json');

const {getAllFestivals, getAllArtists, getArtistFestivals, getArtistCities, getFestivalAllArtists, getFestivalCity, getFestivalArtistsQuantity, getFestivalsByDate 
} = require('./tietokanta/tietokantakerros.js');
const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'EJS'));
app.use(express.static('public'));

app.get('/', async function (req, res) {
    try {
        let mainData = await getFestivalsByDate()
        for (let i = 0; i < mainData.length; i++) {
            let city = await getFestivalCity(i)
            mainData[i]["city_name"] = city[0].name
        
            let list = []
            let artists = await getFestivalAllArtists(i)
            for (let i = 0; i < artists.length; i++) { 
                list.push(artists[i].name + "\n")
            }
            mainData[i]["artists"] = list
        }
        res.render("main-page", {
            festivalsByDate: mainData
        });
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/artistit', async function (req, res) {
    try {
        let mainData = await getAllArtists()
        for (let i = 0; i < mainData.length; i++) {


            let list = []
            let artist_festivals = await getArtistFestivals(i)
            for (let i = 0; i < artist_festivals.length; i++) { 
                list.push(artist_festivals[i].name + "\n")
            }
            mainData[i]["artist_festivals"] = list

            let list2 = []
            let artist_cities = await getArtistCities(i)  
            for (let i = 0; i < artist_cities.length; i++) { 
                list2.push(artist_cities[i].name + "\n")
            }
            mainData[i]["artist_cities"] = list2

            console.log(mainData)

        }
        res.render("artists-page", {
            artists: mainData
        });
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/festarit', async function (req, res) {
    try {
        let mainData = await getAllFestivals()
        for (let i = 0; i < mainData.length; i++) {
            let city = await getFestivalCity(i)
            let quantity = await getFestivalArtistsQuantity(i)

            mainData[i]["quantity"] = quantity
            mainData[i]["city_name"] = city[0].name
        
            let list = []
            let artists = await getFestivalAllArtists(i)
            for (let i = 0; i < artists.length; i++) { 
                list.push(artists[i].name + "\n")
            }
            mainData[i]["artists"] = list
            console.log(mainData)
        }
        res.render("festivals-page", {
            festarit: mainData
        });
    }
    catch(err) {
        console.log(err)  
    }
});



//ARTISTS DATA
app.get('/getArtistFestivals/:artist_id', async function (req, res) {
    try {
        const data = await getArtistFestivals(req.params.artist_id)
        res.json(data)
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/getArtistCities/:artist_id', async function (req, res) {
    try {
        const data = await getArtistCities(req.params.artist_id)
        res.json(data)
    }
    catch(err) {
        console.log(err)  
    }
});



//FESTIVALS DATA
app.get('/getFestivalAllArtists/:festival_id', async function (req, res) {
    try {
        const data = await getFestivalAllArtists(req.params.festival_id)
        res.json(data)
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/getFestivalCity/:festival_id', async function (req, res) {
    try {
        const data = await getFestivalCity(req.params.festival_id)
        res.json(data)
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/getFestivalArtistsQuantity/:festival_id', async function (req, res) {
    try {
        const data = await getFestivalArtistsQuantity(req.params.festival_id)
        res.json(data.toString())
    }
    catch(err) {
        console.log(err)  
    }
});

app.get('/getFestivalsByDate', async function (req, res) {
    try {
        const data = await getFestivalsByDate()
        res.json(data)
    }
    catch(err) {
        console.log(err)  
    }
});

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));