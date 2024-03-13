export class Signup {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    cPassword: string;


    constructor(obj?: any) {
        this.firstname = obj ? obj.firstname : '';
        this.lastname = obj ? obj.lastname : '';
        this.username = obj ? obj.username : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.cPassword = obj ? obj.cPassword : '';
    }


    createSignupObject() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            password: this.password,
            cPassword: this.cPassword,
        }
    }
}