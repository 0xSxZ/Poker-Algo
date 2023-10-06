const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const MongoConnect = callback => {
    MongoClient.connect("mongodb+srv://sxzuu:adam95500@cluster0.d06rbte.mongodb.net/?retryWrites=true&w=majority")
    .then(client =>{
        console.log("[+] Connected to the database");
        
        db = client.db("free");
        var dayInMilliseconds = 1000 * 60 * 60 * 24;
        
        setInterval(() => {
            console.log("[+] Clearing users")
            const ClearProviders = require("../controllers/users").clear
            ClearProviders(db)
        }, dayInMilliseconds);
    }).catch(err => {
        console.log("[!] Error connecting to the database" + err);
        process.exit();
    });
}

const GetDb = () => {
    if(db){
        return db
    }
    
    throw "[!] No Database found"
}

exports.MongoConnect = MongoConnect
exports.GetDb = GetDb