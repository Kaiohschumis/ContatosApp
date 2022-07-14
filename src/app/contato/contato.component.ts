import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = []
  colunas = ["foto", "id", "nome", "email", "favoritos"]
  
  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato).subscribe(resposta => {
      let lista: Contato[] = [... this.contatos, resposta]
      this.contatos = lista;
    })
    }

    uploadFoto(event, contato){
      const files = event.target.files;
      if(files){
        const foto = files[0];
        const formData: FormData = new FormData();
        formData.append("foto", foto)
        this.service.upload(contato, formData).subscribe(response => this.listarContatos());
      }
    }
  

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email] ]
    })
  }

  listarContatos(){
    this.service.list().subscribe(response => {
      this.contatos = response;
    })
  }

  favoritar(contato: Contato){
    this.service.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
    contato.favorito = !contato.favorito;
  }
  visualizarContato(contato: Contato) {
    this.dialog.open( ContatoDetalheComponent, {
      width: "450px",
      height: "450px",
      data: contato
    })
  }

}
