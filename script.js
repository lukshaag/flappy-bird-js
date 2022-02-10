console.log('flappy bird Js');

const sprites = new Image();
sprites.src = "./img/sprites.png";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    drawCanvaX: 0,
    drawCanvaY: canvas.height - 204,
    draw() {
        context.fillStyle = '#70c5ce';
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage (
            sprites, //sprite image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //image x and y
            planoDeFundo.largura, planoDeFundo.altura, //solo image w and h
            planoDeFundo.drawCanvaX, planoDeFundo.drawCanvaY, //image cord in canvas
            planoDeFundo.largura, planoDeFundo.altura, //size image in canvas
        );

        context.drawImage (
            sprites, //sprite image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //image x and y
            planoDeFundo.largura, planoDeFundo.altura, //solo image w and h
            (planoDeFundo.drawCanvaX + planoDeFundo.largura), planoDeFundo.drawCanvaY, //image cord in canvas
            planoDeFundo.largura, planoDeFundo.altura, //size image in canvas
        );
    },                                                                                                                               
};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    drawCanvaX: 0,
    drawCanvaY: canvas.height - 112,
    draw() {
        context.drawImage (
            sprites, //sprite image
            chao.spriteX, chao.spriteY, //image x and y
            chao.largura, chao.altura, //solo image w and h
            chao.drawCanvaX, chao.drawCanvaY, //image cord in canvas
            chao.largura, chao.altura, //size image in canvas
        );

        context.drawImage (
            sprites, //sprite image
            chao.spriteX, chao.spriteY, //image x and y
            chao.largura, chao.altura, //solo image w and h
            (chao.drawCanvaX + chao.largura), chao.drawCanvaY, //image cord in canvas
            chao.largura, chao.altura, //size image in canvas
        );
    },                                                                                                                               
};


const flappyBird = {

    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    drawCanvaX: 10,
    drawCanvaY: 50,
    draw() {
        context.drawImage (
            sprites, //sprite image
            flappyBird.spriteX, flappyBird.spriteY, //image x and y
            flappyBird.largura, flappyBird.altura, //solo image w and h
            flappyBird.drawCanvaX, flappyBird.drawCanvaY, //image cord in canvas
            flappyBird.largura, flappyBird.altura, //size image in canvas
        );
    },
};

function loop() {
    planoDeFundo.draw();
    chao.draw();
    flappyBird.draw();

    requestAnimationFrame(loop);
};

loop();  