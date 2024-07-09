import { Component, OnInit } from '@angular/core';
import { ListaFilmService } from '../service/lista-film.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-film',
  templateUrl: './lista-film.component.html',
  styleUrls: ['./lista-film.component.scss']
})
export class ListaFilmComponent implements OnInit {

  films : any
  modale: boolean = false;
  uploadedFiles: any[] = [];
  files: File[] = [];
  fileUp:any
  form! : FormGroup


  constructor(
    private listaFilmSrv : ListaFilmService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getListaFilm()
    
    this.form = this.fb.group({
      dataUscita: [''],
      locandina: [''],
      regista: [''],
      titolo: [''],

    })
  }

  onSelect(event: any) {
    this.files=[];
    this.files.push(...event.addedFiles);
    console.warn(this.files)
    
    // this.fileUp = this.files[0]
    // if(!this.files[0]){
    //   Swal.fire({
    //     icon: 'error',
    //     title: "Attenzione! La dimensione massima dell'immagine è 2 MB!",
    //     confirmButtonColor: "#343f71"
    //   })
    // }

    // this.getBase64()
    this.fileUp = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileUp);
    reader.onload = () => {
        console.log(reader.result);
        this.fileUp = reader.result
    };
  }

  aggiungiFilm(){
    this.form.value.locandina= this.fileUp 
    console.log(this.form.value);
    this.listaFilmSrv.aggiungiFilm(this.form.value).subscribe(data=>{
      console.log(data);
      
    })
    
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    // this.fileSelezionato = ''
    // console.log(this.fileUp , 'delete fileUp');
    console.log(this.files , 'delete fileUp');

    this.fileUp = undefined
  }

eliminaFilm(){
  Swal.fire({
    title: "Sei sicuro di voler eliminare questo film?",
    text: "Una volta cancellato non potrai tornare indietro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Conferma"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}


//   handleUpload(event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//         console.log(reader.result);
//     };
// }
//   onUpload(event) {
//     for(let file of event.files) {
//         this.uploadedFiles.push(file);
//     }

//     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
// }

  getListaFilm(){
    this.listaFilmSrv.getAllFilm().subscribe(data =>{
      console.log(data);
      this.films = data      
    })
  }

  showModalDialog() {
    this.modale = true;
}


}
