export class Product {
    productId: number;
    categoryId: number;
    categoryName: string;
    productName: string;
    productDescription: string;
    productUnitPrice: number;
    productAdditions: Additions[];
    productOptions: Options[];

    constructor(productId: number,
        categoryId: number,
        categoryName: string,
        productName: string,
        productDescription: string,
        productUnitPrice: number,
        productAdditions: Additions[],
        productOptions: Options[]) {
        this.productId = productId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productUnitPrice = productUnitPrice;
        this.productAdditions = productAdditions;
        this.productOptions = productOptions;

    }

}

export class Options {
    optionId: number;
    optionName: string;
    optionDescription: string;
    isDefault: boolean;
    optionDefaultPrice: number;

    constructor(optionId: number, optionName: string, optionDescription: string, optionDefaultPrice: number, isDefault: boolean) {
        this.optionId = optionId;
        this.optionName = optionName;
        this.optionDescription = optionDescription;
        this.optionDefaultPrice = optionDefaultPrice;
        this.isDefault = isDefault;

    }
}



export class Additions {
    additionsId: number;
    additionsName: string;
    additionsPrice: number;
    additionsDescription: string;
    additionPriceS: number;
    additionPriceN: number;
    additionPriceF: number;
    additionPriceP: number;

    constructor(additionsId: number, additionsName: string, additionsPrice: number, additionsDescription: string,additionPriceS:number,
        additionPriceN:number,additionPriceF:number,additionPriceP:number) {
        this.additionsId = additionsId;
        this.additionsName = additionsName;
        this.additionsPrice = additionsPrice;
        this.additionsDescription = additionsDescription;
        this.additionPriceS=additionPriceS;
        this.additionPriceN=additionPriceN;
        this.additionPriceF=additionPriceF;
        this.additionPriceP=additionPriceP;
    }
}

