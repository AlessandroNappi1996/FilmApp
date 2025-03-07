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
  modaleModifica : boolean = false
  idModifica!: number;
  regista: string = ""
  filtroData: any = "";


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
    
   

    this.fileUp = this.files[0];

        //CONVERTE DA FILE IMMAGINE A B64

    const reader = new FileReader();
    reader.readAsDataURL(this.fileUp);
    reader.onload = () => {
        console.log(reader.result);
        this.fileUp = reader.result
    };

    //
  }

  onSelectMod(event: any) {
    this.files=[];
    this.files.push(...event.addedFiles);
    console.warn(this.files)
    
    

    this.fileUp = this.files[0];

    //CONVERTE DA FILE IMMAGINE A B64
    const reader = new FileReader();
    reader.readAsDataURL(this.fileUp);
    reader.onload = () => {
        console.log(reader.result);
        this.fileUp = reader.result
    };
//

  }

  aggiungiFilm(){    
    
    this.form.value.locandina= this.fileUp 
    console.log(this.form.value);
    this.listaFilmSrv.aggiungiFilm(this.form.value).subscribe(data=>{
      console.log(data);
      if(data==true){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "il film è stato aggiunto!",
        showConfirmButton: false,
        timer: 1500
      });
      this.getListaFilm()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Qualcosa è andato storto!",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    this.files=[]
    this.fileUp= undefined
    })
    
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    // this.fileSelezionato = ''
    // console.log(this.fileUp , 'delete fileUp');
    console.log(this.files , 'delete fileUp');

    this.fileUp = undefined
  }

eliminaFilm(id: number){
  Swal.fire({
    title: "Sei sicuro di voler eliminare questo film?",
    text: "Una volta cancellato non potrai tornare indietro!",
    icon: "warning",
    // showCancelButton: true,
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Conferma",
    denyButtonText: `Indietro`,

  }).then((result) => {
    if (result.isConfirmed) {

      this.listaFilmSrv.deleteFilm(id).subscribe(data=>{
        console.log(data);
        if(data == true){
        Swal.fire({
          title: "Eliminato!",
          // text: "Your file has been deleted.",
          icon: "success"
  
        });
        this.files=[]
        this.fileUp= undefined
        this.getListaFilm()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Qualcosa è andato storto!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
      })
      

    }
  });
}





  getListaFilm(){
    console.log(this.filtroData , 'filtrodata');
    console.log(this.regista , 'regista');
    
    
    this.listaFilmSrv.getAllFilm().subscribe(data =>{
      console.log(data);
      this.films = data      
    })
  }




  getAllFiltri(){
    console.warn(this.regista , 'regista');
    console.warn(this.filtroData, 'data del filtro');
  
    this.listaFilmSrv.getFiltri(this.regista , this.filtroData).subscribe(data =>{
      console.log(data);
      this.films = data
    })
  }

  showModalDialog() {
    this.form.reset()
    console.log(this.form);

    this.files = []
    this.fileUp = undefined
    console.log(this.files , 'FILES');
    console.log(this.fileUp , 'FILEUP');
    
    this.modale = true;
}








filmB64:any

showModalModifica(film:any) {
  // this.files = []
  // this.fileUp = undefined
  console.log(film);
  this.fileUp = film.locandina
  // CONVERTE BASE64 A FILE IMMAGINE PER VEDERE IN ANTEPRIMA L IMMAGINE CHE DOBBIAMO MODIFICARE
  const imageName = "name.png";
  const imageBlob = this.dataURItoBlob_new(film.locandina);
  // console.log(imageBlob.size);
  const imageFile = new File([imageBlob], imageName, { type: "image/png" });
  this.files.push(imageFile);
//

  // this.files.push(film.locandina)
console.log(this.fileUp);

  console.log(this.files);
  

  console.log(this.filmB64);
  
  
  this.form.patchValue(film)             
  
  
  this.idModifica = film.id
  console.log(this.idModifica);
  
  this.modaleModifica = true;
  // this.listaFilmSrv.modificaFilm(ogg).subscribe(data =>{
  //   console.log(data);
    
  // })
  console.log(this.fileUp);
  
}


// CONVERTE DA B64 A FILE IMMAGINE CHE DOBBIAMO MODIFICARE
dataURItoBlob_new(dataURI :any) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}


newData : Date | undefined


modificaFilm(){
  console.log(this.fileUp , 'file up che si leva');


  let obj = {
    id: this.idModifica , 
    dataUscita: this.form.value.dataUscita,
      locandina: this.fileUp ,
      regista: this.form.value.regista,
      titolo: this.form.value.titolo,

  }

  console.log(obj);
  Swal.fire({
    title: "Sicuro di voler modificare questo film?",
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "Conferma",
    denyButtonText: `Annulla`
  }).then((result) => {
    
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.listaFilmSrv.modificaFilm(obj).subscribe(data=>{
        console.log(data);
      if(data=true){
        Swal.fire("Modifica effettuata!", "", "success");
        this.getListaFilm()
        this.files=[]
        this.fileUp= undefined
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Qualcosa è andato storto!",
        });
      }
        })
      // Swal.fire("Modifica effettuata!", "", "success");
    } 
    else {
      console.log( ' vai?');
      
      this.files=[]
      this.fileUp= undefined
    }
  });
  
}


annulla(){
  this.modaleModifica= false
  this.files=[]
  this.fileUp= undefined
}
}
