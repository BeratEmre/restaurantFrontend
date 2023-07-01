import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommentModel } from 'src/app/models/commentModel';
import { ProductBaseModel } from 'src/app/models/product-base-model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.css']
})
export class ProductCommentsComponent implements AfterViewInit {

  @ViewChild('commentModalBtn') commentModalBtn: ElementRef;
  @ViewChild('commentModal') commentModal: ElementRef;
  @Input() product: ProductBaseModel = {
    id: 0,
    name: '',
    description: '',
    imgUrl: '',
    price: 0,
    isHaveStar: false,
    productType: 0,
  };

  @Input() pageVisible: boolean = true;
  @Input() imgUrl: string = '';
  @Output() pageVisibleEvent = new EventEmitter<boolean>();
  commentList: CommentModel[];
  faUser = faUser;

  addCommitVisibility = false;

  constructor(private elementRef: ElementRef, private _commentService: CommentService, private formBuilder: FormBuilder) { }
  addCommitForm = this.formBuilder.group({
    userName: ['', Validators.required],
    productId: ['', Validators.required],
    productTypeId: ['', Validators.required],
    content: ['', Validators.required]
  });

  ngAfterViewInit() {
    this.listComments(this.product);
    this.openOrCloseComments('open');

    const target = this.elementRef.nativeElement.querySelector('#commentModal');
    this.observer(target, { attributes: true }); ///class değişimini okuyan metod
    // observer.observe(target, { attributes: true });

  }

  observer(mutationsList: any, observer: any) {
    new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          console.log('Class changed:', mutation);
          this.openOrCloseComments('close');
        }
      }
    }).observe(mutationsList, observer);
  }

  openOrCloseComments(openClose: string) {
    if (!this.commentModal.nativeElement?.classList.contains('show') && openClose === 'open')
      this.commentModalBtn?.nativeElement?.dispatchEvent(new Event('click'));

    if (openClose === 'close' && !this.commentModal.nativeElement?.classList.contains('show'))
      this.sendDataToParent()
  }

  sendDataToParent() {
    const data = false;
    this.pageVisibleEvent.emit(data);
    this.pageVisible = false;
  }

  listComments(product: ProductBaseModel) {
    this._commentService.getComments(product).subscribe(x => {
      console.log("Commentss " + x)
      if (x.success)
        this.commentList = x.data
    });
  }

  addCommit() {    
    if (this.addCommitForm.invalid) {
      console.log('Form invalid ' + this.addCommitForm)
      return;
    }
    console.log(this.addCommitForm.value)

    this._commentService.addComment(this.addCommitForm.value).subscribe(x=>{      
      if(x.success)
      this.commentList.push(x.data)
      this.addCommitForm.reset();
      this.addCommitVisibility=false;
    })

  }
}
