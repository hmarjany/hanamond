export enum Category{
    Wears,
    Food
}

export namespace Category {
    export function map(index) {
        if(parseInt(index) === 0){
            return 'لباس';
        }

        if(parseInt(index) === 1){
            return 'غذا';
        }
    }
}