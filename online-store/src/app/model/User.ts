export class User {
    name: String;
    email: String;
    password: String;
    tokens: [{ token: { type: String, requierd: true } }];
    token: String;
}