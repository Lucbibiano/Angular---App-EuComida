class Recipe{
    constructor(public name: string, public restaurantId: string,
                public price: string, public description:string, 
                public imagePath: string|any, public id?: string){
    }
}

export {Recipe}   

