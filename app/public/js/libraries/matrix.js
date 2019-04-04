

class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for(let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    static multiply(a, b) {
        // Multiply product
        if (a.cols !== b.rows) {
            console.log("Cols of A must match rows of B!");
            return undefined;
        }
        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j]
                }
                result.data[i][j] = sum;
            }
        } 
        return result;
    }
 
    static transpose(n) {
        let result = new Matrix(n.cols, n.rows);

        for (let i = 0; i < n.rows; i++){
            for (let j = 0; j < n.cols; j++) {
                result.data[j][i] = n.data[i][j];
            }
        }
        return result;
    }

    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for (let i = 0; i < result.rows; i++){
            for(let j = 0; j < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    static map(matrix, fn) {
        let result = new Matrix(matrix.rows, matrix.cols);
        // Apply a function to every element of matrix
        for(let i = 0; i < matrix.rows; i++){
            for(let j = 0; j < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = fn(val);
            }
        }
        return result;
    }

    toArray() {
        let arr = [];
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            // hadamard product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            // Scalar product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
                }
            } 
        }
    }

    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    transpose() {
        let temp = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++) {
                temp.data[j][i] = this.data[i][j];
            }
        }
        this.data = temp.data;
    }

    randomize() {
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    map(fn) {
        // Apply a function to every element of matrix
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        }
    }

    print() {
        console.table(this.data);
    }
}

if (typeof module !== 'undefined') {
    module.exports = Matrix;
}