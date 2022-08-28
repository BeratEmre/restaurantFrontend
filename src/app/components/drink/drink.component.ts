import { HttpClient } from '@angular/common/http';
import { Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DrinkModel } from 'src/app/models/drink-model';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { DrinkService } from 'src/app/services/drink.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {
  @ViewChild("closeModal") closeModal: ElementRef;
  @ViewChild("imgUpdateInput") imgFileModal: ElementRef;
  imgUrl=environment.imgUrl+'/drinks/';
  edit=faEdit;
  trash=faTrashAlt;
  drinks:DrinkModel[]=[];
  fileModel:FileUploadModal<DrinkModel>=new FileUploadModal();
  willUpdatingDrink:DrinkModel=new DrinkModel();
  imgFile:FileSystem;
  constructor(private drinkService:DrinkService, private http:HttpClient) { }

  changeDen(a:any)
  {
    console.log(a)
  }
  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks(){
    this.drinkService.getDrinks().subscribe(res => {
      if (res.success)
        this.drinks = res.data;
      console.log(this.drinks)
    });
  }

  updatingDrink(id:number){
    var re=this.drinks.find(d=>d.drinkId==id)
    if(re!=undefined){
      this.willUpdatingDrink=re;
    }
  }

  updateDrink(){

    this.fileModel.model=this.willUpdatingDrink;
    if(this.imgFileModal.nativeElement.files.length !== 0){
      this.fileModel.formFile=this.imgFileModal.nativeElement.files[0];
      var res=URL.createObjectURL(this.imgFileModal.nativeElement.files[0])
    }
    
    const formData=this.formDataSets();

    this.drinkService.updateDrink(formData).subscribe(res=>{
      if (res.success) {
        this.drinks.forEach(d=>{
          if (d.drinkId==res.data.drinkId) 
            d=res.data          
        })        
      }
    });
  }

  formDataSets():FormData{   
    const formData = new FormData();

    formData.append('formFile',this.fileModel.formFile,this.fileModel.formFile.name);
    formData.append('description',this.fileModel.model.description);
    formData.append('name',this.fileModel.model.name);
    formData.append('imgUrl',this.fileModel.model.imgUrl);
    formData.append('price',this.fileModel.model.price.toString());
    formData.append('drinkId',this.fileModel.model.drinkId.toString());
    return formData;
  }
}
