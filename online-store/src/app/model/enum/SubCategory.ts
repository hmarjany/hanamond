export enum SubCategory{
    None,//0
    Female,//1
    Male,//2
    FemaleKid,//3
    MaleKid,//4
    LebasRahati,//5
    SareHami,//6
    Shalvar,//7
    Set,//8
    SaghJorabDastkeshKolah,//9
    PirahanVaLebasMajlesi,//10
    Kapshen,//11
    Sarafon,//12
    Tonik,//13
    Daman,//14
    LebasBale,//15
    KifKafshPaposh,//16
    MayoValebasZir,//17
    Shomiz,//18
    BolozPoliverTishert,//19
    Soishert,//20
    KotVaZhakat,//21
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

        if(parseInt(index) === 5){
            return 'لباس راحتی';
        }

        if(parseInt(index) === 6){
            return 'سرهمی';
        }

        if(parseInt(index) === 7){
            return 'شلوار';
        }

        if(parseInt(index) === 8){
            return 'ست';
        }

        if(parseInt(index) === 9){
            return 'ساق جوراب دستکش کلاه';
        }

        if(parseInt(index) === 10){
            return 'پیرآهن و لباس مجلسی';
        }

        if(parseInt(index) === 11){
            return 'کاپشن';
        }

        if(parseInt(index) === 12){
            return 'سارافون';
        }

        if(parseInt(index) === 13){
            return 'تونیک';
        }

        if(parseInt(index) === 14){
            return 'دامن';
        }

        if(parseInt(index) === 15){
            return 'لباس باله';
        }

        if(parseInt(index) === 16){
            return 'کیف و کفش و پاپوش';
        }

        if(parseInt(index) === 17){
            return 'مایو و لباس زیر';
        }

        if(parseInt(index) === 18){
            return 'شومیز';
        }

        if(parseInt(index) === 19){
            return 'بولوز پلیور تیشرت';
        }

        if(parseInt(index) === 20){
            return 'سوئیشرت';
        }

        if(parseInt(index) === 21){
            return 'کت و ژاکت';
        }
    }
}