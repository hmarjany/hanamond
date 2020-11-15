import { DeliverTime } from './enum/DeliverTime';

export class Reject{
    productId: any;
    count: number;
    deliverToPhone: string;
    deliverToAddress: string;
    deliverTo:string;
    userName:string;
    ProductName: string;
    deliverDate: Date;
    deliverTime: DeliverTime;
    mobile: any;
    rejected:boolean;
}