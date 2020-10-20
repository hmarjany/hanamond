export enum Brand{
    Ecco,
    Pecco,
    Lapilo
}

export namespace Brand {
    export function map(index) {
        if(parseInt(index) === 0){
            return 'اکو';
        }

        if(parseInt(index) === 1){
            return 'پکو';
        }

        if(parseInt(index) === 2){
            return 'لاپیلو';
        }
    }
}