const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let frames = 0;
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
//chao
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        drawCanvaX: 0,
        drawCanvaY: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentaçao = chao.drawCanvaX - movimentoDoChao;

            chao.drawCanvaX = movimentaçao % repeteEm;

        },
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
    return chao;
}


function fazColisao() {
    const flappyBirdY = globais.flappyBird.drawCanvaY + globais.flappyBird.altura;
    const chaoY = globais.chao.drawCanvaY;

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
            if(fazColisao(flappyBird, globais.chao)) {
                console.log('fez colisao!');
                som_HIT.play();

                switchTela(Telas.START);
                return;
            }
            flappyBird.veloc = flappyBird.veloc + flappyBird.gravidade;
            flappyBird.drawCanvaY = flappyBird.drawCanvaY + flappyBird.veloc; 
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, },//asa pra cima
            {spriteX: 0, spriteY: 26,},//asa no meio
            {spriteX: 0, spriteY: 52,},//asa pra baixo
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 8;
            const passouIntervalo = frames % intervaloDeFrames === 0;

            if (passouIntervalo) {
            const baseDoIncremento = 1;
            const Incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = Incremento % baseRepeticao;
            }
        },
        draw() {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            context.drawImage (
                sprites, //sprite image
                spriteX, spriteY, //image x and y
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
            globais.chao = criaChao();
        },
        draw() {
            planoDeFundo.draw();
            globais.chao.draw();
            globais.flappyBird.draw();
            menuStart.draw();
        },
        click() {
            switchTela(Telas.JOGO);
        },
        update() {
            globais.chao.atualiza();
        }
    },
};

Telas.JOGO = {
    draw() {
        planoDeFundo.draw();
        globais.chao.draw();
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

    frames = frames + 1;
    requestAnimationFrame(loop);
};


window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});


switchTela(Telas.START);
loop();  