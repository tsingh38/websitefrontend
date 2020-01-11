export class PizzaAdditions {

    public id: String;
    public nameOfAddition: String;
    public description: String;
    public priceS: Number;
    public priceN: Number;
    public priceF: Number;
    public priceP: Number;

    constructor(id: String, nameOfAddition: String, description: String, priceS: Number,priceN: Number,priceF: Number,priceP: Number) {
        this.id = id;
        this.nameOfAddition = nameOfAddition;
        this.description = description;
        this.priceS = priceS;
        this.priceN = priceN;
        this.priceF = priceF;
        this.priceP = priceP;
    }
}