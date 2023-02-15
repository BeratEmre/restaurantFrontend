import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faEdit, faStar, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Helper from 'src/app/helper/helper';
import { FileUploadModal } from 'src/app/models/file-upload-model';
import { KeyValue } from 'src/app/models/key-value';
import { MenuModel } from 'src/app/models/menu-model';
import { DrinkService } from 'src/app/services/drink.service';
import { FoodService } from 'src/app/services/food.service';
import { MenuService } from 'src/app/services/menu.service';
import { SweetService } from 'src/app/services/sweet.service';
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
  @ViewChild("foodKeyValueHtml") foodKeyValueHtml: ElementRef;
  @ViewChild("drinkKeyValueHtml") drinkKeyValueHtml: ElementRef;
  @ViewChild("sweetKeyValueHtml") sweetKeyValueHtml: ElementRef;
  @ViewChild("closeRemovePopup") closeRemovePopup: ElementRef;
  @ViewChild('TABLE', { static: false }) exportTable: ElementRef;
  imgUrl = environment.imgUrl + '/menus/';

  edit = faEdit;
  trash = faTrashAlt;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faStar=faStar;
  successMessage = '';


  menus: MenuModel[] = [];
  sweetKeyValue: KeyValue[] = [];
  drinkKeyValue: KeyValue[] = [];
  foodKeyValue: KeyValue[] = [];

  fileModel: FileUploadModal<MenuModel> = new FileUploadModal();
  willUpdatingMenu: MenuModel = new MenuModel();
  removingMenu: MenuModel = new MenuModel();
  formFile:File;

  imgFile: FileSystem;

  addForm = new FormGroup({
    formFile: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    sweetId: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    foodId: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    drinkId: new FormControl('', [Validators.pattern("^[0-9]*$")]),
  });

  constructor(private menuService: MenuService, private sweetService: SweetService, private foodService: FoodService, private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.getMenus();
    console.log(this.menus)
  }

  getMenus() {
    this.menuService.getMenus().subscribe(res => {
      if (res.success)
        this.menus = res.data;
      console.log(this.menus)
    });
  }

  updatingMenu(id: number) {
    var re = this.menus.find(d => d.id == id)
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
          if (d.id == res.data.id)
            d = res.data;
        })
        this.successMessage = res.data.name + " ürünü başarıyla güncellendi!";
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
      this.formFile = event.target.files[0];      
      // this.addForm.patchValue({
      //   formFile: file
      // });
    }
  }
  updateFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileModel.formFile = event.target.files[0];
    }
  }

  addMenu(): boolean {
    if (this.addForm.status == "INVALID")
      return false;

    var formData = this.formDataSetsForAdd()
    console.log(formData)
    this.menuService.addMenu(formData).subscribe(res => {
      if (res.success) {
        console.log(res.data)
        this.menus.push(res.data);
        console.log(this.menus)
        this.successMessage = 'Ürün Ekleme İşlemi Başarıyla Gerçekleşti';
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
    if (Helper.isEmpty(this.addForm.value.drinkId)) 
    this.addForm.value.drinkId='0';
    if (Helper.isEmpty(this.addForm.value.foodId)) 
    this.addForm.value.foodId='0';
    if (Helper.isEmpty(this.addForm.value.sweetId)) 
    this.addForm.value.sweetId='0';
    const formData = new FormData();
    formData.append('formFile',  this.formFile, this.formFile.name);
    formData.append('name', this.addForm.value.name as string);
    formData.append('description', this.addForm.value.description as string);
    formData.append('price', this.addForm.value.price as string);
    formData.append('foodId', this.addForm.value.foodId  as string);
    formData.append('drinkId', this.addForm.value.drinkId as unknown as string);
    formData.append('sweetId', this.addForm.value.sweetId as unknown as string);
    // formData.append('isHaveStar', 'false' as string);

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
    formData.append('menuId', this.fileModel.model.id.toString());
    formData.append('foodId', this.fileModel.model.foodId.toString());
    formData.append('drinkId', this.fileModel.model.drinkId.toString());
    formData.append('sweetId', this.fileModel.model.sweetId.toString());
    return formData;
  }

  closeSuccessMessageBox() {
    this.successMessageBox.nativeElement.classList.add('d-none')
  }

  removingMenuFind(id: number) {
    var re = this.menus.find(d => d.id == id)
    if (re != undefined) {
      this.removingMenu = re;
    }
  }

  removeMenu() {
    this.menuService.remove(this.removingMenu.id).subscribe(s => {
      if (s.success) {
        this.menus = this.menus.filter(d => d.id != this.removingMenu.id);
        this.successMessage = s.data.name + " ürünü başarıyla silindi!";
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

  foodsGet() {
    console.log(this.foodKeyValueHtml.nativeElement.className.search('d-none'))
    if (this.foodKeyValueHtml.nativeElement.className.search('d-none') != -1) {
      this.foodService.getKeyValue().subscribe(s => {
        if (s.success) {
          this.foodKeyValue = s.data;
          this.foodKeyValueHtml.nativeElement.classList.remove('d-none')
        }
      })
    } else
      this.foodKeyValueHtml.nativeElement.classList.add('d-none')
  }

  drinksGet() {
    console.log(this.drinkKeyValueHtml.nativeElement.className.search('d-none'))
    if (this.drinkKeyValueHtml.nativeElement.className.search('d-none') != -1) {
      this.drinkService.getKeyValue().subscribe(s => {
        if (s.success) {
          this.drinkKeyValue = s.data;
          this.drinkKeyValueHtml.nativeElement.classList.remove('d-none')
        }
      })
    } else
      this.drinkKeyValueHtml.nativeElement.classList.add('d-none')
  }

  sweetsGet() {
    console.log(this.sweetKeyValueHtml.nativeElement.className.search('d-none'))
    if (this.sweetKeyValueHtml.nativeElement.className.search('d-none') != -1) {
      this.sweetService.getKeyValue().subscribe(s => {
        if (s.success) {
          this.sweetKeyValue = s.data;
          this.sweetKeyValueHtml.nativeElement.classList.remove('d-none')
        }
      })
    } else
      this.sweetKeyValueHtml.nativeElement.classList.add('d-none')
  }

  starTheMenu(menuId:number){
    console.log(menuId)
    this.menuService.addStar(menuId).subscribe(s=>{
      if (s) {
        var menu=this.menus.find(m=>m.id==menuId);
        menu!=null?menu.isHaveStar=true:menu;
      }
    })
  }

  getMenu(id:number):MenuModel{
    var menu=this.menus.find(x=>x.id==id);
    if(menu==undefined)      
      menu =new MenuModel();
    return menu
  }
}
