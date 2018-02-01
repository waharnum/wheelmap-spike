var apiKey = process.env.WHEELMAP_KEY;
if(apiKey) {
    var Client = require("node-rest-client").Client;

    var client = new Client();

    
} else {
    console.log("Please set API key to WHEELMAP_KEY env variable");
    process.exit(1);
}
