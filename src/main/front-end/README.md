# dawClub Front-end using VueJS

Sample Vite project with classic CRUD Web App using VueJS front-end & Vite

## Features:
- SPA independent web application
- Component based design
- Content organization using ES6 modules (DAO) and Vue SFCs
- ES6 syntax for DAO class
    - DAO ES6 in-memory array implementation for testing purposes (no API REST needed )
    - DAO ES6 fetch implementation (for back-end REST access)

## Usage:
- Select Clientes DAO implementation in Front-end VueJS AppClientes module: 
  - ClientesDAOList for in-memory implementation (No API REST required)
  - ClientesDAOFetch for API REST access. Provide API url on DAO constructor in AppClientes component 
- Resolve dependencies[*] and launch Vue front-end from ``src/main/front-end`` folder and access in url ``http://localhost:3000``
```
 $ npm install
 $ npm run dev 
 ```
 **[*]** requires NodeJS v12+