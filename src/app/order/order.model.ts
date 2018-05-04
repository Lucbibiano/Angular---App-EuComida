class Order{
    constructor(public endereco: string, public numero: number,
                public complemento: string, public formaPagamento: string,
                public orderItems: OrderItem[] = [], public id?:string){

    }
}

class OrderItem{
    constructor(public quantidade: number, public menuId: string){}
}

export {Order, OrderItem}