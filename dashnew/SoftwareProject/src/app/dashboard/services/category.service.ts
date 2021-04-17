import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Category from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  dbPath='/category';
  categoryRef:AngularFireList<Category>=null
  
  length:number=null

  constructor(private db:AngularFireDatabase) { 
    this.categoryRef=db.list(this.dbPath);
  }

  createCategory(category:Category){
    return this.categoryRef.push(category);
  }

  getAll():AngularFireList<Category>{
    return this.categoryRef;
    
  }
}
