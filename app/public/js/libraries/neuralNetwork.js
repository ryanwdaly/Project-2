
// let nn = new NeuralNetwork(2, 2, 1);
'use strict'
class NeuralNetwork {
    constructor(numI, numH, numO) {
        this.inputNodes = numI;
        this.hiddenNodes = numH;
        this.outputNodes = numO;
        this.learningRate = 0.1;
        // Weights between input and hidden
        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
        // Weights between hidden and output
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
        // Bias of hidden nods
        this.biasH = new Matrix(this.hiddenNodes, 1);
        // Bias of output nodes
        this.biasO = new Matrix(this.outputNodes, 1);
        this.weightsIH.randomize();
        this.weightsHO.randomize();
        this.biasH.randomize();
        this.biasO.randomize();
    }
    
    feedforward(inputArr) { 
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(inputArr);
        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasH);
        hidden.map(sigmoid);
        // Generating the output
        let output = Matrix.multiply(this.weightsHO, hidden);
        output.add(this.biasO);
        output.map(sigmoid);
        return output.toArray();
    }
    
    train(inputArr, targetArr) {
        // console.table(this.weightsIH.data)
        let inputs = Matrix.fromArray(inputArr);
        // Generating the Hidden Outputs
        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasH);
        hidden.map(sigmoid);
        // Generating the output
        let outputs = Matrix.multiply(this.weightsHO, hidden);
        outputs.add(this.biasO);
        outputs.map(sigmoid);
        /////
        
        // // Delta W = LearningRate * Error * dsigmoid(output) * Inputs trasposed
        
        // outputs = Matrix.fromArray(outputs);
        let targets = Matrix.fromArray(targetArr);
        // Calculate the error
        let outputErrors = Matrix.subtract(targets, outputs);
        
        // Calculate Gradient
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(outputErrors);
        gradients.multiply(this.learningRate);
        
        // Calculate Delta
        let hiddenT = Matrix.transpose(hidden);
        let weightHODeltas = Matrix.multiply(gradients, hiddenT);

        // Adjust weights by deltas
        this.weightsHO.add(weightHODeltas);

        // Adjust the bias by its deltas
        this.biasO.add(gradients);

        // Calculate hidden layer errors
        let weightsHOT  = Matrix.transpose(this.weightsHO);
        let hiddenErrors = Matrix.multiply(weightsHOT, outputErrors);

        // Calculate hidden gradient
        let hiddenGradient = Matrix.map(hidden, dsigmoid);
        hiddenGradient.multiply(hiddenErrors);
        hiddenGradient.multiply(this.learningRate);

        // Calculate Hidden Deltas
        let inputsT = Matrix.transpose(inputs);
        let weightIHDeltas = Matrix.multiply(hiddenGradient, inputsT);

        this.weightsIH.add(weightIHDeltas)

        this.biasH.add(hiddenGradient);
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function dsigmoid(y) {
    // return (sigmoid(x) * (1 - sigmoid(x)))
    return y * (1 - y);
}