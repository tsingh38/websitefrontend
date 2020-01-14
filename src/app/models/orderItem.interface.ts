import { productItem,productItemOption,productItemAddition } from './product.interface'

export interface orderItem{
    product:productItem,
    selectedOption : productItemOption,
    listOfAdditions: productItemAddition[],
    quantity: number,
    totalPrice: number
}

