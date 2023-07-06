const names ={
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez","Itschak"
    ,"David" ],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};


export function range(min, max) {
    return Array.from({length: max - min})
    .map((__, index) => index + min)
}

export function getRandomInt(min, max) {
    if(min === max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}

export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}

export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
    const gender = getRandomElement(['male', 'female']);
    const name = getRandomElement(gender === 'female' ? names.femaleNames :
     names.maleNames);
     const birthYear = getRandomInt(minYear, maxYear + 1);
     const salary = getRandomInt(minSalary, maxSalary) * 1000;
     const department = getRandomElement(departments);
     return {
          name, birthYear, gender,
         salary, department};
 }

export function getRandomMatrix(rows,columns,min,max){
    return Array.from({length:rows}).map(() => getRandomArrayIntNumbers(columns,min,max))
}

export function getRandomArrayIntNumbers(nNumbers,min,max){
    return Array.from({length: nNumbers}).map(() => getRandomInt(min,max))
}

export function arraySum(array){

    return array.length === 0 ? 0 : array.reduce((res,curr) => res + curr);
}

export function matrixSum( matrix ){

    return matrix.reduce((sum,cur) => sum + arraySum(cur),0)
}

export function count(array, field, interval) {
    return array.reduce((res, cur)=>{
        const intervalNumber = Math.trunc(cur[field] / interval);
        res[intervalNumber] = res[intervalNumber] == undefined ? 1 :
         res[intervalNumber] + 1
         return res;
    }, {});
}