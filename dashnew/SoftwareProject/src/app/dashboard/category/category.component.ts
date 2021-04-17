import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category:any;

  constructor(private categorySer:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();

  }

  getAllCategories(){

    this.categorySer.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe((data)=>{
      this.category=data
      this.categorySer.length=this.category.length
    })
  }

}
