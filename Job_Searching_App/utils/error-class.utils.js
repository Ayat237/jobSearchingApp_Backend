

export class errorClass extends Error{
    constructor(message, status, data ,location){
        super( message);
        this.status = status;
        this.data = data;
        this.location = location;
    }
}