import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faEdit, faStar, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from 'src/app/enums/product-type';
import FavoriteProductHelper from 'src/app/helper/favoriteProductHelper';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { FoodModel } from 'src/app/models/food-model';
import { FavoriteProductService } from 'src/app/services/favoriteProduct.service';
import { FoodService } from 'src/app/services/food.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @ViewChild("closeModal") closeUpdateModal: ElementRef;
  @ViewChild("successMessageBox") successMessageBox: ElementRef;
  @ViewChild("closeRemovePopup") closeRemovePopup: ElementRef;
  @ViewChild('TABLE', { static: false }) exportTable: ElementRef; 
  imgUrl = environment.imgUrl + '/foods/';

  edit = faEdit;
  trash = faTrashAlt;
  faTimes=faTimes;
  faCheckCircle=faCheckCircle;
  faStar=faStar;
  successMessage='';
  foods: FoodModel[] = [];
  fileModel: FileUploadModal<FoodModel> = new FileUploadModal();
  willUpdatingFood: FoodModel = new FoodModel();
  removingFood:FoodModel=new FoodModel();

  imgFile: FileSystem;
  
    addForm = new FormGroup({
      formFile: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

  constructor(private foodService: FoodService, private _favoriteService:FavoriteProductService) { }

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(res => {
      if (res.success)
        this.foods = res.data;
      console.log(this.foods)
    });
  }

  updatingFood(id: number) {
    var re = this.foods.find(d => d.id == id)
    if (re != undefined) {
      this.willUpdatingFood = re;
    }
  }

  updatefood() {
    this.fileModel.model = this.willUpdatingFood;

    const formData = this.formDataSets();
    this.foodService.updateFood(formData).subscribe(res => {
      if (res.success) {
        this.foods.forEach(d => {
          if (d.id == res.data.id)
            d = res.data;
        })
        this.successMessage=res.data.name+" ürünü başarıyla güncellendi!";
        this.successMessageBox.nativeElement.classList.remove('d-none');
        setTimeout(() => { this.closeSuccessMessageBox();}, 5000);
        this.closeUpdateModal.nativeElement.click();
      }
    });
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
    if (event.target.files.length > 0) 
      this.fileModel.formFile = event.target.files[0];    
  }

  addfood(): boolean {
    console.log(this.addForm)
    if (this.addForm.status == "INVALID")
      return false;

    var formData = this.formDataSetsForAdd()
    this.foodService.addFood(formData).subscribe(res => {
      if (res.success) {
        this.foods.push(res.data); 
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


  formDataSets(): FormData {
    const formData = new FormData();

    console.log(this.fileModel.formFile)
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

  removingFoodFind(id:number){
    var re = this.foods.find(d => d.id == id)
    if (re != undefined) {
      this.removingFood = re;
    }
  }

  removeFood(){
   console.log(this.removingFood)
    this.foodService.remove(this.removingFood.id).subscribe(s=>{
      if (s.success) {
        this.foods=this.foods.filter(d=>d.id!=this.removingFood.id);
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

  getFood(id:number):FoodModel{
    var food=this.foods.find(x=>x.id==id);
    if(food==undefined)      
    food =new FoodModel();
    return food
  }

  favoritePositionChange(id:number){
    var food=this.foods.find(f=>f.id==id);
    if (food==null || food == undefined )
      return;

    FavoriteProductHelper.addOrDelte(food,this._favoriteService,ProductType.food.toString());   
  }
}
