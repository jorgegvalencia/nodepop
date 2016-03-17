# Nodepop
API para dar servicio a una aplicación de compra/venta de artículos de segunda mano.

## Dependencias
 - [nodejs](https://nodejs.org/en/)
 - *npm* Por defecto con node.
 - *nodemon* `npm install nodemon -g`
 - *apidoc* `npm install apidoc -g`
 - *jscs* `npm install jscs -g`
 - *MongoDB*

## Setup

Instalar las dependencias del package.json del proyecto ejecutando `npm install`.

Para poner en servicio la API:

- Iniciar el servidor de MongoDB: `mongod --dbpath <directorio_de_datos> --directoryperdb`.
		*Nota: El directorio de datos debe existir previamente.*
- Crear una base de datos llamada **nodepopdb**, con dos colecciones: '*anuncios*' y '*usuarios*'.
- [*Opcional*] Poblar la base de datos con el script *init_db.js*: `node init_db.js`.
- Ejecutar `nodemon` desde el directorio raíz del proyecto.
    *Alternativamente podemos ejecutar* `npm start`

## Documentación de la API

La documentación de la API se encuentra disponible a través de la URI 'dir_servidor:puerto/api/documentation/'