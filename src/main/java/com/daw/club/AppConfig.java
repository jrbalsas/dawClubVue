package com.daw.club;

import com.daw.club.model.Cliente;
import com.daw.club.model.dao.ClienteDAO;
import com.daw.club.model.dao.qualifiers.DAOMap;
import com.daw.club.model.dao.qualifiers.DAOJpa;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.Startup;
import jakarta.enterprise.inject.Default;
import jakarta.inject.Inject;

import java.util.logging.Logger;

/** Configure App
 *
 * @author jrbalsas
 */

@Default
@ApplicationScoped
public class AppConfig {

        @Inject @DAOMap
        //@Inject @DAOJpa
        ClienteDAO clienteDAO;

        private Logger logger = Logger.getLogger(AppConfig.class.getName());

        public void onStartup(@Observes Startup event) {
                logger.info(">>>Inicializando aplicación");

                createSampleData();
        }

        public void createSampleData() {
                logger.info("Creando clientes de prueba");

                clienteDAO.crea( new Cliente(0, "Paco López", "11111111-A", false) );
                clienteDAO.crea( new Cliente(0, "María Jiménez", "22222222-B", true) );
                clienteDAO.crea( new Cliente(0, "Carlos García", "33333333-C", true) );
        }
}
