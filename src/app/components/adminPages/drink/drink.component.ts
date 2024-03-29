import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faEdit, faPlus, faStar, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from 'src/app/enums/product-type';
import FavoriteProductHelper from 'src/app/helper/favoriteProductHelper';
import { DrinkModel } from 'src/app/models/drink-model';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { DrinkService } from 'src/app/services/drink.service';
import { FavoriteProductService } from 'src/app/services/favoriteProduct.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {
  @ViewChild("closeModal") closeModal: ElementRef;
  @ViewChild("successMessageBox") successMessageBox: ElementRef;
  @ViewChild("closeRemovePopup") closeRemovePopup: ElementRef;
  @ViewChild('TABLE', { static: false }) exportTable: ElementRef; 
  imgUrl = environment.imgUrl + '/drinks/';

  edit = faEdit;
  trash = faTrashAlt;
  faTimes=faTimes;
  faCheckCircle=faCheckCircle;
  faStar=faStar;
  successMessage='';
  drinks: DrinkModel[] = [];
  fileModel: FileUploadModal<DrinkModel> = new FileUploadModal();
  willUpdatingDrink: DrinkModel = new DrinkModel();
  removingDrink:DrinkModel=new DrinkModel();

  imgFile: FileSystem;
  
    addForm = new FormGroup({
      formFile: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  


  constructor(private drinkService: DrinkService, private _favoriteService:FavoriteProductService) { }

  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(res => {
      if (res.success)
        this.drinks = res.data;
      console.log(this.drinks)
    });
  }

  updatingDrink(id: number) {
    var re = this.drinks.find(d => d.id == id)
    if (re != undefined) {
      this.willUpdatingDrink = re;
    }
  }

  resetAddForm() {
    console.log(this.addForm.controls['name'])
    this.addForm.controls['name'].setValue('');
    this.addForm.controls['description'].setValue('');
    this.addForm.controls['price'].setValue('');
    this.addForm.controls['formFile'].setValue('');

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) 
      this.fileModel.formFile = event.target.files[0];
  }

  updateFileChange(event:any){
    if (event.target.files.length > 0) {
      this.fileModel.formFile = event.target.files[0];
    }
  }

  addDrink(): boolean {
    console.log(this.addForm)
    if (this.addForm.status == "INVALID")
      return false;

    var formData = this.formDataSetsForAdd()
    this.drinkService.addDrink(formData).subscribe(res => {
      if (res.success) {
        this.drinks.push(res.data); 
        this.successMessage ='Ürün Ekleme İşlemi Başarıyla Gerçekleşti';
        this.successMessageBox.nativeElement.classList.remove('d-none')
        setTimeout(() => { this.closeSuccessMessageBox();}, 5000);
        this.resetAddForm();
      }
    });

    return true;
  }

  formDataSetsForAdd(): FormData {
    console.log(this.addForm.value.formFile)
    const formData = new FormData();
    formData.append('formFile', this.fileModel.formFile, this.fileModel.formFile.name);
    formData.append('name', this.addForm.value.name as string);
    formData.append('description', this.addForm.value.description as string);
    formData.append('price', this.addForm.value.price as string);
    return formData;
  }

  updateDrink() {
    this.fileModel.model = this.willUpdatingDrink;

    const formData = this.formDataSets();

    this.drinkService.updateDrink(formData).subscribe(res => {
      if (res.success) {
        this.drinks.forEach(d => {
          if (d.id == res.data.id)
            d = res.data
        })
        this.successMessage=res.data.name+" ürünü başarıyla güncellendi!";
        this.successMessageBox.nativeElement.classList.remove('d-none');
        setTimeout(() => { this.closeSuccessMessageBox();}, 5000);
      }
    });
  }

  formDataSets(): FormData {
    const formData = new FormData();

    formData.append('formFile', this.fileModel.formFile, this.fileModel.formFile.name);
    formData.append('description', this.fileModel.model.description);
    formData.append('name', this.fileModel.model.name);
    formData.append('imgUrl', this.fileModel.model.imgUrl);
    formData.append('price', this.fileModel.model.price.toString());
    formData.append('id', this.fileModel.model.id.toString());
    return formData;
  }
  
  closeSuccessMessageBox(){
    this.successMessageBox.nativeElement.classList.add('d-none')
  }

  removingDrinkFind(id:number){
    var re = this.drinks.find(d => d.id == id)
    if (re != undefined) {
      this.removingDrink = re;
    }
  }

  removeDrink(){
   console.log(this.removingDrink)
    this.drinkService.remove(this.removingDrink.id).subscribe(s=>{
      if (s.success) {
        this.drinks=this.drinks.filter(d=>d.id!=this.removingDrink.id);
        this.successMessage=s.data.name+" ürünü başarıyla silindi!";
        this.successMessageBox.nativeElement.classList.remove('d-none');
        setTimeout(() => { this.closeSuccessMessageBox();}, 5000);
        this.closeRemovePopup.nativeElement.click()
      }
    });
  }

  ExportTOExcel() {  
    console.log(this.exportTable)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exportTable.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Exel');
    XLSX.writeFile(wb, 'İçecek Listesi.xlsx');  
  }  

  getDrink(id:number):DrinkModel{
    var drink=this.drinks.find(x=>x.id==id);
    if(drink==undefined)      
    drink =new DrinkModel();
    return drink
  }

  favoritePositionChange(id:number){
    var drink=this.drinks.find(f=>f.id==id);
    if (drink==null || drink == undefined )
      return;

    FavoriteProductHelper.addOrDelte(drink,this._favoriteService,ProductType.drink.toString());   
  }
}
