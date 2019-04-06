


    // -pretty it up
    // -the length of time it take to get to the rocket affects fitness
    // -make sketch a class and fix variable declarations ????
    // $("#submit").click('click', function(){
    // });
    let popSize;
    let mutationRate;
    let lifespan;

    let inputPop;
    let inputMut;
    let inputLife;

    var target;
    var rocket;
    var population;

    var count = 0; 
    var generation = 1;
    var cnv;
    var successGen;
    var logged = false;

    var barrierx;
    var barriery;
    var barrierw;
    var barrierh;
    var run;

    function setup() {
        run = false;
        noLoop();
        createCanvas(600, 400).parent("#canvas");
        target = createVector(width/2, 50)
        
        barrierw = width/3;
        barrierh = 10;    
        barrierx = (width - barrierw) / 2;
        barriery = (height - barrierh) / 2;

        //input popsize
        inputPop = createInput().attribute('placeholder', 200);
        inputPop.position(5, 65)
        
        //input mutationRate
        inputMut = createInput().attribute('placeholder', 0.001);
        inputMut.position(5, 95);

        //input lifespan
        inputLife = createInput().attribute('placeholder', 100);
        inputLife.position(5, 125);

        //submitbtn
        let submitBtn = createButton('submit');
        submitBtn.position(5, 155);
        submitBtn.mousePressed(runDraw);

        //resetBtn
        let resetBtn = createButton('reset');
        resetBtn.position(65, 155)
        resetBtn.mousePressed(reset)
    }
    function draw() {
        if (run) {

            background(0);
            ellipse(target.x, target.y, 16, 16)
            fill(255);
            rect(barrierx, barriery, barrierw, barrierh);
            
            if (count == lifespan) {
                generation++;
                population.evaluate();
                population.generateNextGen();
                count = 0;
            }
            count++;

            select("#framecount").html(nf(count, 3));
            select("#generationcount").html(nf(generation, 3));
            for (let i = 0; i < popSize; i++) {
                population.stack[i].update(count);
                population.stack[i].show();
                if (population.stack[i].completed === true && logged === false) {
                    console.log("success!");
                    successGen = generation;
                    logData();
                    logged = true;
                }
            }
        }
    }

    function runDraw() {
        popSize = inputPop.value();
        mutationRate = inputMut.value();
        lifespan = inputLife.value();

        // if (typeof popSize === null || typeof mutationRate === null
        //     || typeof lifespan === null) {
        //         alert("please enter valid input")
        //         return;
        //     }
        
        
        population = new Population(mutationRate, popSize, lifespan)
        run = true; 
        loop()
    }

    function reset() {
        setup();
    }
  



  
    
    
