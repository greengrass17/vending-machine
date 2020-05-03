export default class VendingMachine {
    coins: number[]

    constructor(coinSet: object);

    vending(price: number, insertSet: object): void;
}