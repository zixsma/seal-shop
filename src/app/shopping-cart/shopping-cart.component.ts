import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem;
  cartItemKeys: string[];
  formGroup: FormGroup;
  amoutArrayControl: FormArray;
  totalPrice: number;

  constructor(public cartService: CartService, formBuilder: FormBuilder) {
    this.cartItems = cartService.getItems();
    this.cartItemKeys = Object.keys(this.cartItems);

    this.amoutArrayControl = new FormArray([], Validators.required);
    this.formGroup = new FormGroup({
      cartList: this.amoutArrayControl
    });
    // this.formGroup = formBuilder.group({
    //   cartList: formBuilder.array([
    //     [], Validators.required
    //   ]),
    // });
    // this.amoutArrayControl = this.formGroup.controls.cartList as FormArray;

    this.formGroup.valueChanges.subscribe({
      next: (data) => {
        console.dir(data);
        this.totalPrice = data.cartList.reduce((total, amount, index) => {
          const itemId =  this.cartItemKeys[index];
          const itemInCart = this.cartItems[itemId];
          return (amount * itemInCart.item.price) + total;
        }, 0);
      },
      error: (err) => {},
      complete: () => {}
    });

    this.cartItemKeys.forEach((cartItemKey) => {
      this.amoutArrayControl.push(
        new FormControl(this.cartItems[cartItemKey].amount, [Validators.min(1), Validators.required]))
    });
  }

  ngOnInit() {
  }

  removeItem(itemId: string, index: number) {
    this.cartItemKeys.splice(index, 1);
    this.amoutArrayControl.removeAt(index);
    delete this.cartItems[itemId];
  }

}
