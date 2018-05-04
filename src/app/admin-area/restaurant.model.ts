class Restaurant{
    constructor(public name: string, public category: string,
                public deliveryEstimate: string, public about: string,
                public hours:string, public imagePath: string|any, public rating: number, 
                public id?: string){
    }
}

export {Restaurant}