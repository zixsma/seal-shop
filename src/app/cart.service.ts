import { Injectable } from '@angular/core';
import { Item } from 'src/app/item';
import { CartItem } from 'src/app/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemList: CartItem

  constructor() {
    this.itemList = {};
  }

  getItems() {
    return this.itemList;
  }

  addItem(item: Item) {
    if (this.itemList[item.id]) {
      this.itemList[item.id].amount++;
    } else {
      this.itemList[item.id] = {
        item: item,
        amount: 1
      }
    }
  }
}
