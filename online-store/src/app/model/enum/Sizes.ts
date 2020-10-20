export enum Sizes{
    ooo,//0
    oo,//1
    nb,//2
    oo1,//3
    _1_3,//4
    _3,//5
    _3_6,//6
    _6,//7
    _6_9,//8
    _9,//9
    _9_12,//10
    _12,//11
    _12_18//12
}


export namespace Sizes {
    export function map(index) {
        if(parseInt(index) === 0){
            return '000';
        }

        if(parseInt(index) === 1){
            return '00';
        }

        if(parseInt(index) === 2){
            return 'nb';
        }

        if(parseInt(index) === 3){
            return '001';
        }

        if(parseInt(index) === 4){
            return '1-3';
        }

        if(parseInt(index) === 5){
            return '3';
        }

        if(parseInt(index) === 6){
            return '3-6';
        }

        if(parseInt(index) === 7){
            return '6';
        }

        if(parseInt(index) === 8){
            return '6-9';
        }

        if(parseInt(index) === 9){
            return '9';
        }

        if(parseInt(index) === 10){
            return '9-12';
        }

        if(parseInt(index) === 11){
            return '12';
        }

        if(parseInt(index) === 12){
            return '12-18';
        }
    }
}