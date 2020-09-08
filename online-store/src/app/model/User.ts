import { Address } from './Address';

export class User {
    _id: any;
    name: String;
    phoneNumber: String;
    email: String;
    password: String;
    tokens: [{ token: { type: String, requierd: true } }];
    token: String;
    address: Address[]
}