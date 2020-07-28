"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var haushaltshilfe;
(function (haushaltshilfe) {
    let orders;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://Luziagu:EIA2@eia2-lozyt.mongodb.net/EIA2?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log(server);
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Haushaltshilfe").collection("orders");
        console.log("Database connection", orders != undefined);
    }
    let anyOrder = [];
    async function handleRequest(_request, _response) {
        console.log("what's up?");
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            //for (let key in url.query) {
            // _response.write(key + ":" + url.query[key]); 
            //}
            if (_request.url == "/?getorders=yes") { //Wenn ein url angefraht wird, dann..
                let options = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoClient = new Mongo.MongoClient(databaseUrl, options);
                await mongoClient.connect(); // Mongo client wird verbindet. 
                let orders = mongoClient.db("Haushaltshilfe").collection("orders"); //Hier wird der CLient Household und in dieser die collection Orders erstellt. 
                let mongoCursor = orders.find();
                await mongoCursor.forEach(retrieveOrder); //Es soll gewartet werden und die Funktion retrieveOrder wird dann für jeden Aufruf von Cursor aufgerufen.  
                let jsonString = JSON.stringify(anyOrder);
                let answer = jsonString.toString();
                _response.write(answer);
                anyOrder = [];
            }
            else { // wenn nicht, dann soll eine Variable gebildet werden,
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString); //und diese als Antwort zurück geliefert werden
                storeOrder(url.query); //Der url Query soll dann an die collection der Database geschickt/eingetragen werden
            }
            //let jsonString: string = JSON.stringify(url.query); 
            //_response.write(jsonString); 
            storeOrder(url.query);
        }
        _response.end(); //Antwort wird verschickt
    }
    function retrieveOrder(_order) {
        let jsonString = JSON.stringify(_order);
        anyOrder.push(jsonString); // In das Array soll dann der jsonString gepusht werden 
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(haushaltshilfe = exports.haushaltshilfe || (exports.haushaltshilfe = {}));
//# sourceMappingURL=server.js.map