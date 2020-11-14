import { Sizes } from './enum/Sizes';
import { Size } from './Size';

export class PurchasedItem {
    productId:any;
    count: number;
    name: string;
    selectedSize: Sizes;
    size:Array<Size>;
    quantity: number;
}