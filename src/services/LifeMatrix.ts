
export default class LifeMatrix {

    private _newMatrix:number[][] = [];

    constructor(private _numbers: number[][]){
        
    }

    get numbers() {
        return this._numbers;
    }
    next(): number[][] {
        
       this._newMatrix = this._numbers.map(row => row.map(cell => cell))
    
       this._numbers.forEach((row,indexRow) => {
            row.forEach((__,index) => {
                const countNeighbor = this.getAllNeighbor(indexRow,index);
                this.changeCell(indexRow,index,countNeighbor);
            })

        });
        this._numbers = this._newMatrix.map(row => row.map(cell => cell));

        return this._newMatrix
    }

    private getAllNeighbor (indexRow:number,index:number):number {
        let count:number = 0;
        count += this._numbers[indexRow][index + 1] ? this._numbers[indexRow][index + 1] : this._numbers[indexRow][0]
        count += this._numbers[indexRow][index - 1] ? this._numbers[indexRow][index - 1] : this._numbers[indexRow][this._numbers[indexRow].length - 1]  
        count += this.getTopNeighbor(indexRow - 1, index);
        count += this.getBottomNeighbor(indexRow + 1, index);

        return count;
    }

    private getTopNeighbor(indexRow:number,index:number):number{
       let res:number = 0;
       indexRow = indexRow > -1 ? indexRow : this._numbers.length - 1;
            
       res += this._numbers[indexRow][index - 1] ? this._numbers[indexRow][index - 1] : this._numbers[indexRow][this._numbers[indexRow].length - 1]
       res += this._numbers[indexRow][index];
       res += this._numbers[indexRow][index + 1] ? this._numbers[indexRow][index + 1] : this._numbers[indexRow][0]
         
       return res;
    }

    
    private getBottomNeighbor(indexRow:number,index:number):number{
        let res:number = 0;
        indexRow = indexRow < this._numbers.length - 1 ? indexRow : 0;
             
        res += this._numbers[indexRow][index - 1] ? this._numbers[indexRow][index - 1] : this._numbers[indexRow][this._numbers[indexRow].length - 1]
        res += this._numbers[indexRow][index];
        res += this._numbers[indexRow][index + 1] ? this._numbers[indexRow][index + 1] : this._numbers[indexRow][0]
          
        return res;
     }

     private changeCell(indexRow:number,index:number,countNeighbor:number) {
        if(this._numbers[indexRow][index] == 1){
            this._newMatrix[indexRow][index] = (countNeighbor > 1 && countNeighbor < 4) ? 1 : 0;
        } else {
            this._newMatrix[indexRow][index] = countNeighbor === 3 ? 1 : 0;
        }

     }

}