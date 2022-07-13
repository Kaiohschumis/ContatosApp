package com.kaiosx.agendaapi;

import com.kaiosx.agendaapi.model.entity.Contato;
import com.kaiosx.agendaapi.model.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AgendaApiApplication {

	@Bean
	public CommandLineRunner commandLineRunner(
			@Autowired ContatoRepository repository){
		return args -> {
			Contato contato = new Contato();
			contato.setNome("");
			contato.setEmail("");
			contato.setFavorito(false);
			repository.save(contato);
		};

	}

	public static void main(String[] args) {

		SpringApplication.run(AgendaApiApplication.class, args);
	}

}
