package com.kaiosx.agendaapi.model.repository;

import com.kaiosx.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
