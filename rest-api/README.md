#  Tutorials REST API

Provides a basic REST API implementation to manage tutorial entities.

## Requirements

- Node.js

## Usage

Navigate to the `rest-api` folder using a command line.

````sh
cd ./rest-api
````

Install the required node packages. The installation is only required once.

````sh
npm install
````

Run Express with following command. This will run the REAST API server on port 5000.

````sh
npm run dev
````

## Notes

The server works with locally stored JSON files, so it needs write permissions for the `db` folder and/or for the file `db/tutorials.json`.

There is an example data source for tutorials in `db/tutorials.json.example`. Copy this file to `db/tutorials.json` if you want to start with some predefined tutorial records.

````sh
cp ./db/tutorials.json.example ./db/tutorials.json
````

