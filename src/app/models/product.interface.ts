export interface  productItem{
id:number,
description:string,
productCategory:string,
optionDescription:string,
productBasePrice:string,
productAdditions:productItemAddition[],
productOptions:productItemOption[]
}

export interface productItemAddition{
    id:number;
additionDescription: string,
additionPrice: string,
additionsPriceForSmall: string,
additionsPriceForNormal: string,
additionsPriceForFamily: string,
additionsPriceForParty: string
}


export interface productItemOption{
    id: number;
productOptionDescription: string;
optionPrice: string;
optionPriceForSmall: number;
optionPriceForNormal: number;
optionPriceForFamily: number;
optionPriceForParty: number;
}