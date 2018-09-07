import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Seal Shop';
  listItem = [
    { id: "1", title: "Nike", category: "รองเท้า", price: 299, imageUrl: "https://media.shopat24.com/pdmain/890757_010_01.jpg" },
    { id: "2", title: "Unqlo", category: "เสื้อ", price: 399, imageUrl: "http://d126drxy0lew0u.cloudfront.net/catalog/product/large_image/03_195524.jpg" },
    { id: "3", title: "Outdoor", category: "กระเป๋า", price: 799, imageUrl: "http://r.lnwfile.com/76plhj.jpg" }
  ];
  toggleCart = false;
  cartItemCount = 0;

  constructor(productService: ProductService, public cartService: CartService) {
    productService.itemList = this.listItem;
    const items = cartService.getItems();
    this.cartItemCount = Object.keys(items).length;
  }
}
