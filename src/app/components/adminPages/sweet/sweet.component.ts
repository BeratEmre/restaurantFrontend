import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faEdit, faStar, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from 'src/app/enums/product-type';
import FavoriteProductHelper from 'src/app/helper/favoriteProductHelper';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { SweetModel } from 'src/app/models/sweet-model';
import { FavoriteProductService } from 'src/app/services/favoriteProduct.service';
import { SweetService } from 'src/app/services/sweet.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-sweet',
  templateUrl: './sweet.component.html',
  styleUrls: ['./sweet.component.css']
})
export class SweetComponent implements OnInit {
  @ViewChild("closeModal") closeUpdateModal: ElementRef;
  @ViewChild("successMessageBox") successMessageBox: ElementRef;
  @ViewChild("closeRemovePopup") closeRemovePopup: ElementRef;
  @ViewChild('TABLE', { static: false }) exportTable: ElementRef; 
  imgUrl = environment.imgUrl + '/sweets/';

  edit = faEdit;
  trash = faTrashAlt;
  faTimes=faTimes;
  faCheckCircle=faCheckCircle;
  faStar=faStar;

  successMessage='';
  sweets: SweetModel[] = [];
  fileModel: FileUploadModal<SweetModel> = new FileUploadModal();
  willUpdatingSweet: SweetModel = new SweetModel();
  removingSweet:SweetModel=new SweetModel();

  imgFile: FileSystem;
  
    addForm = new FormGroup({
      formFile: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  


  constructor(private sweetService: SweetService, private _favoriteService:FavoriteProductService) { }

  ngOnInit(): void {
    this.getSweets();
  }

  getSweets() {
    this.sweetService.getSweets().subscribe(res => {
      if (res.success)
        this.sweets = res.data;
      console.log(this.sweets)
    });
  }

  updatingSweet(id: number) {
    var re = this.sweets.find(d => d.id == id)
    if (re != undefined) {
      this.willUpdatingSweet = re;
    }
  }

  updateSweet() {
    this.fileModel.model = this.willUpdatingSweet;

    const formData = this.formDataSets();
    this.sweetService.updateSweet(formData).subscribe(res => {
      if (res.success) {
        this.sweets.forEach(d => {
          if (d.id == res.data.id)
            d = res.data;
        })
        this.successMessage=res.data.name+" ürünü başarıyla güncellendi!";
        this.successMessageBox.nativeElement.classList.remove('d-none');
        setTimeout(() => {
          this.closeSuccessMessageBox()
        }, 5000);
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
    if (event.target.files.length > 0) {
      this.fileModel.formFile = event.target.files[0];
    }
  }

  addSweet(): boolean {
    console.log(this.addForm)
    if (this.addForm.status == "INVALID")
      return false;

    var formData = this.formDataSetsForAdd()
    console.log(formData)
    this.sweetService.addSweet(formData).subscribe(res => {
      if (res.success) {
        console.log(res)
        this.sweets.push(res.data); 
        this.successMessage ='Ürün Ekleme İşlemi Başarıyla Gerçekleşti';
        this.successMessageBox.nativeElement.classList.remove('d-none')
        setTimeout(() => {
          this.closeSuccessMessageBox()
        }, 5000);
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

  removingSweetFind(id:number){
    console.log(id)
    var re = this.sweets.find(d => d.id == id)
    console.log(re)
    if (re != undefined) {
      this.removingSweet = re;
    }
  }

  removeSweet(){
   console.log(this.removingSweet)
    this.sweetService.remove(this.removingSweet.id).subscribe(s=>{
      if (s.success) {
        this.sweets=this.sweets.filter(d=>d.id!=this.removingSweet.id);
        this.successMessage=s.data.name+" ürünü başarıyla silindi!";
        this.successMessageBox.nativeElement.classList.remove('d-none');
        setTimeout(() => {
          this.closeSuccessMessageBox()
        }, 5000);
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

  getSweet(id:number):SweetModel{
    var sweet=this.sweets.find(x=>x.id==id);
    if(sweet==undefined)      
    sweet =new SweetModel();
    return sweet;
  }

  favoritePositionChange(id:number){
    var sweet=this.sweets.find(f=>f.id==id);
    if (sweet==null || sweet == undefined )
      return;

    FavoriteProductHelper.addOrDelte(sweet,this._favoriteService,ProductType.sweet.toString());   
  }
}
