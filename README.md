# Nodepop
API to provide service to a multiplatform application for buying and selling second-hand articles.

## Dependencias
 - [nodejs](https://nodejs.org/en/)
 - *npm* By default with node.
 - *nodemon* `npm install nodemon -g`
 - *apidoc* `npm install apidoc -g`
 - *jscs* `npm install jscs -g`
 - *MongoDB*

## Setup

Install the dependencies within the package.json of the project typing in the terminal `npm install`.

Steps for running the API service:

- Start the MongoDB server: `mongod --dbpath <data_directory> --directoryperdb`.
		*Note: The data directory must exist previous executing the command.*
- Create a database called **nodepopdb**, with two collections: '*anuncios*' y '*usuarios*'.
- [*Optional*] Populate the database with the script *init_db.js*: `node init_db.js`.
- Execute `nodemon` from the root directory of the project.
    *Alternatively we can execute* `npm start`

## API documentation

The API documentation is available at the URI 'dir_servidor:puerto/api/documentation/'