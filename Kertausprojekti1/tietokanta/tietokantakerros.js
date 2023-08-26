const mariadb = require("mariadb");
const dbconfig = require("./sqlconfig.json");


//Hae kaikki festivaalit .
function getAllFestivals() {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query("SELECT * FROM festivals")
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Hae kaikki artistit .
function getAllArtists() {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query("SELECT * FROM artists")
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Festivaalit, joissa artisti esiintyy .
function getArtistFestivals(artistId) {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query(`SELECT festivals.name
                        FROM festivals
                        INNER JOIN festival_artists 
                        ON festivals.id=festival_artists.festival_id 
                        WHERE artist_id = ${artistId};`)
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Kaupungit, joissa artisti esiintyy .
function getArtistCities(artistId) {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query(`SELECT cities.name
                        FROM cities
                        INNER JOIN festivals 
                        ON cities.id=festivals.city_id
                        INNER JOIN festival_artists 
                        ON festivals.id=festival_artists.festival_id 
                        WHERE artist_id = ${artistId}
                        `)
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Hae festivaalin kaikki artistit .
function getFestivalAllArtists(festivalId) {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query(`SELECT artists.name
                        FROM artists
                        INNER JOIN festival_artists 
                        ON artists.id=festival_artists.artist_id
                        WHERE festival_artists.festival_id = ${festivalId};`)
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Kaupunki, jossa tietty festivaali tapahtuu .
function getFestivalCity(festivalId) {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query(`SELECT cities.name
                        FROM cities
                        INNER JOIN festivals 
                        ON cities.id=festivals.city_id 
                        WHERE festivals.id = ${festivalId};`)
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Festivaalit, joissa on eniten artisteja .
function getFestivalArtistsQuantity(festivalId) {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query(`SELECT COUNT(artist_id) FROM festival_artists WHERE festival_id = ${festivalId}`)
                .then(rows => resolve(rows[0]['COUNT(artist_id)']))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

//Festivaalien lajittelu ajankohdan mukaan .
function getFestivalsByDate() {
    return new Promise(function(resolve, reject){
        mariadb.createConnection(dbconfig)
        .then(conn => {
            conn.query("SELECT * FROM festivals ORDER BY date")
                .then(rows => resolve(rows))
                .catch(e => reject(e))  
                .then(() => conn.close())})
                .catch(e => reject(e))
      })
}

module.exports = {
    getAllFestivals, getAllArtists, getArtistFestivals, getArtistCities, getFestivalAllArtists, getFestivalCity, getFestivalArtistsQuantity, getFestivalsByDate 
};