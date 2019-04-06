
// let trainImages;
// let trainLabels;
// let testImages;
// let testLabels;

//training has 60k examples
//test has 10k examples
function loadMNIST(callback) {
    let mnist = {}
    loadfile("data/t10k-images-idx3-ubyte", 16)
        .then(data => {
            mnist.testImages= data;
            return loadfile('data/t10k-labels-idx1-ubyte', 8);
        })
        .then(data => {
            mnist.testLabels = data;
            return loadfile('data/train-images-idx3-ubyte', 16);
        })
        .then(data => {
            mnist.trainImages = data;
            return loadfile('data/train-labels-idx1-ubyte', 8);
        })
        .then(data => {
            mnist.trainLabels = data;
            callback(mnist);
        })
}

// Must have offset because of file headers
async function loadfile(file,offset) {
    let r = await fetch(file);
    let data = await r.arrayBuffer();
    // console.log(data)
    return new Uint8Array(data).slice(offset);
}