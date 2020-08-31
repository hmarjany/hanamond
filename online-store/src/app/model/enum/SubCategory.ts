export enum SubCategory{
    None,
    Female, 
    Male,
    FemaleKid,
    MaleKid
}

export namespace SubCategory {
    export function map(index) {
        if(parseInt(index) === 0){
            return '';
        }

        if(parseInt(index) === 1){
            return 'زنانه';
        }

        if(parseInt(index) === 2){
            return 'مردانه';
        }

        if(parseInt(index) === 3){
            return 'دختر بچه';
        }

        if(parseInt(index) === 4){
            return 'پسر بچه';
        }
    }
}