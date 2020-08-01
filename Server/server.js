"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var haushaltshilfe;
(function (haushaltshilfe) {
    let orders;
    let allPictures = [];
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let mongoClient;
    let databaseUrl = "mongodb+srv://Luziagu:EIA2@eia2-lozyt.mongodb.net/EIA2?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer(); // Für Server wird Port erstellt
        console.log(server);
        console.log("Server starting on port:" + _port);
        server.listen(_port); //Server hört auf Port und der Port wird geöffnet
        server.addListener("request", handleRequest); // Ein Event Request wird auf den Server gesetzt, der dann die Funktion HandleRequest aufruft
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect(); //MongoDB soll verbunden werden
        orders = mongoClient.db("Zauberbild").collection("magicPicture"); //Daten die in Ordern gespeichert wurden werden in der collection abgelegt. 
        console.log("Database connection", orders != undefined);
    }
    //let anyOrder: string[] = [];
    async function handleRequest(_request, _response) {
        console.log("what's up?");
        console.log(_request.url); //Wie mit der Request umgegangen wird 
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let spliturl = _request.url.split("&");
            if (spliturl[0] == "/?saveImage") {
                orders = mongoClient.db("Zauberbild").collection("magicPicture"); //Daten der collection zuordnen
                await (orders).insertOne(url.query);
                _response.write("Picture saved");
            }
            if (spliturl[0] == "/?getImage") { //ausgewählter Titel mit Titel in Datenbank abgleichen und die richtigen
                //Bilddaten anfordern, raussuchen
            }
            if (spliturl[0] == "/?getTitles") { //alle Titel aus Datenbank raussuchen
                let names = orders.find({}, { projection: { name: 1 } });
                await names.forEach(showOrders);
                let jsonString = JSON.stringify(allPictures);
                jsonString.toString();
                _response.write(jsonString);
                _response.write(names.toString());
                console.log(names);
            }
            /*if (_request.url == "/?getmagicPicture=yes") { //Wenn ein url angefraht wird, dann..
                let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
                await mongoClient.connect(); // Mongo client wird verbindet.
                let orders: Mongo.Collection = mongoClient.db("Zauberbild").collection("magicPicture"); //Hier wird der CLient Household und in dieser die collection Orders erstellt.
                let mongoCursor: Mongo.Cursor<any> = orders.find();
                await mongoCursor.forEach(retrieveOrder); //Es soll gewartet werden und die Funktion retrieveOrder wird dann für jeden Aufruf von Cursor aufgerufen.
                let jsonString: string = JSON.stringify(anyOrder);
                let answer: string = jsonString.toString();
                _response.write(answer);
                anyOrder = [];
            }*/
            //let jsonString: string = JSON.stringify(url.query); 
            //_response.write(jsonString); 
            storeOrder(url.query);
        }
        _response.end(); //Antwort wird verschickt
    }
    /*function retrieveOrder(_order: Order): void {
        let jsonString: string = JSON.stringify(_order);
        anyOrder.push(jsonString); // In das Array soll dann der jsonString gepusht werden

    }*/
    function storeOrder(_order) {
        orders.insert(_order);
    }
    function showOrders(_item) {
        let jsonString = JSON.stringify(_item);
        allPictures.push(jsonString);
    }
})(haushaltshilfe = exports.haushaltshilfe || (exports.haushaltshilfe = {}));
//# sourceMappingURL=server.js.map