# dawClub using VueJS

Sample Maven project with classic CRUD Web App using VueJS front-end & JakartaEE REST back-end

## Features:
### VueJS Front-End
- SPA independent web application
- Component based design
- Content organization using ES6 modules (DAO) and Vue SFCs
- ES6 syntax for DAO class
  - DAO ES6 in-memory array implementation for testing purposes (no API REST needed )
  - DAO ES6 fetch implementation (for back-end REST access)
- [Front-End source](./src/main/front-end)
### JakartaEE Back-end
- JAX-RS REST webservice for serving JSON contents
- JAX-RS CORS filter to allow access from Front-end

## Usage:
 - Select Clientes DAO implementation in Back-end JAX-RS Service: ClientDAOJPA or ClientesDAOMap
 - Select Clientes DAO implementation in Front-end VueJS AppClientes module: ClientesDAOfetch or ClientesDAOList
 - Package and deploy back-end in a Jakarta 10 Application Server, e.g. Payara/Glassfish
 - Resolve dependencies and launch Vue front-end from ``src/main/front-end`` folder and access in url ``http://localhost:5173``
```
 $ npm install
 $ npm run dev 
 ```
