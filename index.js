// Not a lot of work here yet, but this would be for writing
// server-side client code
"use strict";

var fluid = require("infusion");
var Client = require("node-rest-client").Client;
var client = new Client();

var bigidea = fluid.registerNamespace("bigidea");

// Wrapper for https://www.npmjs.com/package/node-rest-client
fluid.defaults("bigidea.restClient", {
    gradeNames: ["fluid.component"],
    // See https://www.npmjs.com/package/node-rest-client#options-parameters
    clientOptions: {
    },
    restConfig: {
        url: "",
        headers: {
        },
        parameters: {
        },
        path: {
        },
        data: {
        },
        requestConfig: {
        },
        responseConfig: {
        }
    },
    listeners: {
        "onCreate.initializeClient": {
            funcName: "bigidea.restClient.initializeClient"
        }
    },
    invokers: {
        get: {
            funcName: "bigidea.restClient.get",
            args: ["{that}"]
        }
    }
});

bigidea.restClient.initializeClient = function (that) {
    that.client = new Client(that.options.clientOptions);
};

bigidea.restClient.get = function(that) {

    var args = {
        headers: that.options.restConfig.headers,
        parameters: that.options.restConfig.parameters,
        path: that.options.restConfig.path,
        data: that.options.restConfig.data
    };

    var promise = fluid.promise();

    client.get(that.options.restConfig.url, args, function (data, response) {
        promise.resolve(
            {
                data: data,
                response: response}
        );
    });

    return promise;
};

var apiKey = process.env.ACCESSIBILITY_CLOUD_KEY;

var acClient = bigidea.restClient({
    restConfig: {
        url: "https://www.accessibility.cloud/place-infos.json",
        headers: {
            "X-App-Token": apiKey,
            "Accept": "application/json"
        },
        parameters: {
            latitude: 43.6542386,
            longitude: -79.3913016,
            accuracy: 1000
        }
    },
});

var getPromise = acClient.get();

    getPromise.then(
        function (response) {
            fluid.each(response.data.features, function (feature) {
                console.log(feature, feature.properties.accessibility);
            });
        },
        function (error) {
            console.log(error);
        });
