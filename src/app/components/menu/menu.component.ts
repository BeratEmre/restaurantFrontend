import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faEdit, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { MenuModel } from 'src/app/models/menu-model';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild("closeModal") closeUpdateModal: ElementRef;
  @ViewChild("successMessageBox") successMessageBox: ElementRef;
  @ViewChild("closeRemovePopup") closeRemovePopup: ElementRef;
  @ViewChild('TABLE', { static: false }) exportTable: ElementRef; 
  imgUrl = environment.imgUrl + '/menus/';

  edit = faEdit;
  trash = faTrashAlt;
  faTimes=faTimes;
  faCheckCircle=faCheckCircle;
  successMessage='';
  menus: MenuModel[] = [];
  fileModel: FileUploadModal<MenuModel> = new FileUploadModal();
  willUpdatingMenu: MenuModel = new MenuModel();
  removingMenu:MenuModel=new MenuModel();

  imgFile: FileSystem;
  
    addForm = new FormGroup({
      formFile: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  


  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe(res => {
      if (res.success)
        this.menus = res.data;
      console.log(this.menus)
    });
  }

  updatingMenu(id: number) {
    var re = this.menus.find(d => d.menuId == id)
    if (re != undefined) {
      this.willUpdatingMenu = re;
    }
  }

  updateMenu() {
    this.fileModel.model = this.willUpdatingMenu;

    const formData = this.formDataSets();
    this.menuService.updateMenu(formData).subscribe(res => {
      if (res.success) {
        this.menus.forEach(d => {
          if (d.menuId == res.data.menuId)
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addForm.patchValue({
        formFile: file
      });
    }
  }
  updateFileChange(event:any){
    if (event.target.files.length > 0) {
      this.fileModel.formFile = event.target.files[0];
    }
  }

  addMenu(): boolean {
    console.log(this.addForm)
    if (this.addForm.status == "INVALID")
      return false;

    var formData = this.formDataSetsForAdd()
    this.menuService.addMenu(formData).subscribe(res => {
      if (res.success) {
        this.menus.push(res.data); 
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
    formData.append('formFile', this.addForm.value.formFile as string);
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
    formData.append('menuId', this.fileModel.model.menuId.toString());
    return formData;
  }
  
  closeSuccessMessageBox(){
    this.successMessageBox.nativeElement.classList.add('d-none')
  }

  removingMenuFind(id:number){
    var re = this.menus.find(d => d.menuId == id)
    if (re != undefined) {
      this.removingMenu = re;
    }
  }

  removeMenu(){
   console.log(this.removingMenu)
    this.menuService.remove(this.removingMenu.menuId).subscribe(s=>{
      if (s.success) {
        this.menus=this.menus.filter(d=>d.menuId!=this.removingMenu.menuId);
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
}
