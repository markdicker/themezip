const zip = require( "./index.js" );

// create a file to stream archive data to.
var basePath = "/Users/markdicker/Client Dev/Siren/Theme";

zip ( "example.zip", basePath );