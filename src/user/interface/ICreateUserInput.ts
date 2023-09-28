export interface ICreateUserInput {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    roles?: string;
}
