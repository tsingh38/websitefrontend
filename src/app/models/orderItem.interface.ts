import { productItem,productItemOption,productItemAddition } from './product.interface'

export interface orderItem{
    product:productItem,
    selectedOption : productItemOption,
    selectedOptionStr:string,
    listOfAdditions: productItemAddition[],
    quantity: number,
    totalPrice: number
}

