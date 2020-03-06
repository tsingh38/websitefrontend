export interface  productItem{
id?:number;
description:string;
productCategory:string;
optionDescription:string;
productBasePrice:number;
productAdditions:productItemAddition[];
productOptions:productItemOption[]
}

export interface productItemAddition{
    id:number;
additionDescription: string;
additionPrice: number;
additionsPriceForSmall: number;
additionsPriceForNormal: number;
additionsPriceForFamily: number;
additionsPriceForParty: number;
}


export interface productItemOption{
    id: number;
productOptionDescription: string;
optionPrice: number;
default:boolean;
optionPriceForSmall: number;
optionPriceForNormal: number;
optionPriceForFamily: number;
optionPriceForParty: number;
}