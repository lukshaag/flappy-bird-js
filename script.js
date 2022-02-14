const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";

//
// ####SPRITES####
//
const sprites = new Image();
sprites.src = "./img/sprites.png";



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

const menuStart = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    drawCanvaX: (canvas.width / 2) - 174 / 2,
    drawCanvaY: 50,
    draw() {
        context.drawImage(
            sprites, //sprite image
            menuStart.spriteX, menuStart.spriteY, //image x and y
            menuStart.largura, menuStart.altura, //solo image w and h
            menuStart.drawCanvaX, menuStart.drawCanvaY, //image cord in canvas
            menuStart.largura, menuStart.altura, //size image in canvas
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

function fazColisao() {
    const flappyBirdY = globais.flappyBird.drawCanvaY + globais.flappyBird.altura;
    const chaoY = chao.drawCanvaY;

    if(flappyBirdY >= chaoY) {
        return true;
    };

    return false;
};

function criaFlappyBird() {
    const flappyBird = {
    
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        drawCanvaX: 10,
        drawCanvaY: 50,
        pulo: 4.6,
        Pula() {
            console.log('devo pular!');
            flappyBird.veloc = - flappyBird.pulo;
        },
        gravidade: 0.25,
        veloc: 0,
        update() {
            if(fazColisao(flappyBird, chao)) {
                console.log('fez colisao!');
                som_HIT.play();

                switchTela(Telas.START);
                return;
            }
            flappyBird.veloc = flappyBird.veloc + flappyBird.gravidade;
            flappyBird.drawCanvaY = flappyBird.drawCanvaY + flappyBird.veloc; 
        },
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
    return flappyBird;
}

//
// ####SCREENS####
//
const globais = {};
let telaAtiva = {};
function switchTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}
const Telas = {
    START: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        draw() {
            planoDeFundo.draw();
            chao.draw();
            globais.flappyBird.draw();
            menuStart.draw();
        },
        click() {
            switchTela(Telas.JOGO);
        },
        update() {

        }
    },
};

Telas.JOGO = {
    draw() {
        planoDeFundo.draw();
        chao.draw();
        globais.flappyBird.draw();
    },
    click() {
        globais.flappyBird.Pula();

    },
    update() {
        globais.flappyBird.update();
    }
};
//
// ####LOOP####
//
function loop() {
    
    telaAtiva.draw();
    telaAtiva.update();

    requestAnimationFrame(loop);
};


window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});


switchTela(Telas.START);
loop();  