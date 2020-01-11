export class PizzaUnit {

    pizzaId: string;
    pizzaName: string;
    pizzaPriceS: Number;
    pizzaPriceN: Number;
    pizzaPriceF: Number;
    pizzaPriceP: Number;
    pizzaDescription: string;

    constructor(pizzaId: string, pizzaName: string, pizzaDescription: string,pizzaPriceS:Number,pizzaPriceN:Number,pizzaPriceF:Number,pizzaPriceP:Number) {
        this.pizzaId = pizzaId;
        this.pizzaName = pizzaName;
        this.pizzaDescription = pizzaDescription;
        this.pizzaPriceS=pizzaPriceS;
        this.pizzaPriceN=pizzaPriceN;
        this.pizzaPriceF=pizzaPriceF;
        this.pizzaPriceP=pizzaPriceP;

    }
}