/** Class Service samples: DAO implementations */

/** DAO implementation using fetch api with promises*/
export class ClientesDAOfetch {

    /** Configure DAO with REST api URL
     * @pre requires CORS enabled on REST API
     * @param apiurl REST api URL*/
    constructor(apiurl) {
        this.srvUrl = apiurl;
        this.respuestaValida=false; //status of last ajax request
    }
    buscaTodos() {
        return fetch(this.srvUrl)
            .then (response => this.comprobarRespuesta(response) )
            .then (response => this.devolverRespuesta(response) );
    }
    busca(id = 0) {
        return fetch(this.srvUrl + "/" + id)
            .then (response => this.comprobarRespuesta(response) )
            .then (response => this.devolverRespuesta(response) );
    }
    crea(cliente) {

        return fetch(this.srvUrl, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then (response => this.comprobarRespuesta(response) )
            .then (response => this.devolverRespuesta(response) );
    }
    guarda(cliente) {
        return fetch(`${this.srvUrl}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then (response => this.comprobarRespuesta(response) )
            .then (response => this.devolverRespuesta(response) );
    }
    borra(id = 0) {
        return fetch(this.srvUrl + "/" + id,{
            method: 'DELETE'
        })
            .then (response => this.comprobarRespuesta(response) )
            .then (response => this.devolverRespuesta(response) );
    }

    /** Saves response status and returns object data*/
    comprobarRespuesta(response) {
        this.respuestaValida=response.ok;
        //TODO check network errors
        return response.json();
    }
    devolverRespuesta (json) {
        //Resolves or reject promise with response data
        if (!this.respuestaValida) {
            //send validation errors
            //Rejects promise, forces catch response in DAO
            return Promise.reject(json);
        }
        return json;
    }
} //End ClientesDAOfetch

/** DAO implementation using in-memory sample data*/
export class ClientesDAOList {

    constructor() {
        this.idClientes = 1;
        this.clientes = [
            {id: this.idClientes++,
                nombre: 'María González',
                dni: '12345678-A',
                socio: true},
            {id: this.idClientes++,
                nombre: 'Pedro Pérez',
                dni: '87654321B',
                socio: true},
            {id: this.idClientes++,
                nombre: 'Sergio Fuentes',
                dni: '11223344',
                socio: false}
        ];
    }
    //Simulate an async operation which returns data with some delay
    asyncOp(data) {
        let promise=new Promise((resolve,reject) => {
            setTimeout(function () {
                resolve(data);
            }, 100);
        });
        return promise;
    }
    //public methods
    buscaTodos() {
        return this.asyncOp(this.clientes);
    }
    busca(id) {
        var cliente = {};
        if (id > 0) {
            //Look for cliente
            this.clientes.some(function (c, key) {

                if (c.id === id) {

                    //cliente= Object.assign({},c); //copying object
                    cliente= {...c}; //copying object with spread syntax
                    return true;
                }
                return false;
            });
        }
        return this.asyncOp(cliente);
    }
    borra(id) {
        if (id > 0) {
            //Borrar cliente
            this.clientes.some(function (c, key, clientes) {
                if (c.id === id) {
                    clientes.splice(key, 1);
                    return true;
                }
                return false;
            });
        }
        return this.asyncOp({});
    }
    guarda(cliente) {
        if (cliente.id > 0) {
            //Modify cliente data
            this.clientes.some(function (c, key) {
                if (c.id === cliente.id) {
                    c = {...cliente}; //Copy cliente
                    return true;
                }
                return false;
            });
        }
        return this.asyncOp({});
    }
    crea(cliente) {
        //New cliente
        cliente.id = this.idClientes++;
        this.clientes.push({...cliente});
        return this.asyncOp(cliente);
    }
} //ClientesDAOList