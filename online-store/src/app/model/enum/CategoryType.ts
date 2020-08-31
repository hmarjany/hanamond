export enum CategoryType{
    Shoe,
    UnderWear,
    Wear
}

export namespace CategoryType {
    export function map(index) {
        if(parseInt(index) === 0){
            return 'کفش';
        }

        if(parseInt(index) === 1){
            return 'لباس زیر';
        }

        if(parseInt(index) === 2){
            return 'لباس';
        }
    }
}