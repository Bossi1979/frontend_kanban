export class Contact {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    nameAbbreviation: string;
    backgroundColor: string;
    checked: boolean;
    phone: string;
    hasAccount: boolean;


    constructor(obj?: any){
        this.firstname = obj ? obj.firstname : '';
        this.lastname = obj ? obj.lastname : '';
        this.username = obj? obj.username : '';
        this.email = obj? obj.email : '';
        this.nameAbbreviation = obj ? obj.nameAbbreviation : '';
        this.backgroundColor = obj ? obj.backgroundColor: '';
        this.checked = obj ? obj.checked : false;
        this.phone = obj ? obj.phone : '';
        this.hasAccount = obj ? obj.hasAccount : false;
    }


    createContactObject(){
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            nameAbbreviation: this.nameAbbreviation,
            backgroundColor: this.backgroundColor,
            checked: this.checked,
            phone: this.phone,
            hasAccount: this.hasAccount
        }
    }
}