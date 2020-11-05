import { User } from './User';

export class Comment{
    _id: any;
    productId: any;
    user: User;
    description: String;
    like: number;
    dislike: number;
    approved: boolean;
}