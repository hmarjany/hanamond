export enum Category{
    Wears,
    Food,
    Toddler,
    Child
}

export namespace Category {
    export function map(index) {
        if(parseInt(index) === 0){
            return 'لباس';
        }

        if(parseInt(index) === 1){
            return 'غذا';
        }

        if(parseInt(index) === 2){
            return 'نوزاد';
        }

        if(parseInt(index) === 3){
            return 'کودک';
        }
    }
}