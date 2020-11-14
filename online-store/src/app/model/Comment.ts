import { UserId } from './UserId';

export class Comment{
    _id: any;
    productId: any;
    userName: String;
    userId: any;
    description: string;
    like: number;
    dislike: number;
    useresDlikes: Array<UserId>;
    approved: boolean;
}