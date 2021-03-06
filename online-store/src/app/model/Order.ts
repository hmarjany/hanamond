import { DeliverTime } from './enum/DeliverTime';
import { Purchased } from './Purchased';
import { PurchasedItem } from './PurchasedItem';

export class Order{
    purchasedItem:Array<PurchasedItem>;
    pickUp: boolean = false;
    deliverdStatus: boolean = false;
    recieve: boolean = false;
    totalPrice: number;
    paymentStatus: boolean;
    deliverDate: Date;
    deliverTime: DeliverTime;
    paymentDate:Date;
    payOnline: boolean;
    address: string;
    deliverTo: string;
    deliverToPhone: string;
    purchasedUserDetails:Purchased;
    athority: any;
    zarinStatus: any;
    refId: any;
}