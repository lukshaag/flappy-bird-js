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


//
//  [PLANO DE FUNDO]
//
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    draw() {
        context.fillStyle = '#70c5ce';
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage (
            sprites, //sprite image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //image x and y
            planoDeFundo.largura, planoDeFundo.altura, //solo image w and h
            planoDeFundo.x, planoDeFundo.y, //image cord in canvas
            planoDeFundo.largura, planoDeFundo.altura, //size image in canvas
        );

        context.drawImage (
            sprites, //sprite image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //image x and y
            planoDeFundo.largura, planoDeFundo.altura, //solo image w and h
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //image cord in canvas
            planoDeFundo.largura, planoDeFundo.altura, //size image in canvas
        );
    },                                                                                                                               
};

const msgGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw() {
        context.drawImage(
            sprites, //sprite image
            msgGetReady.spriteX, msgGetReady.spriteY, //image x and y
            msgGetReady.largura, msgGetReady.altura, //solo image w and h
            msgGetReady.x, msgGetReady.y, //image cord in canvas
            msgGetReady.largura, msgGetReady.altura, //size image in canvas
        );
    },                                                                                                                               
};

const msgGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    draw() {
        context.drawImage(
            sprites, //sprite image
            msgGameOver.spriteX, msgGameOver.spriteY, //image x and y
            msgGameOver.largura, msgGameOver.altura, //solo image w and h
            msgGameOver.x, msgGameOver.y, //image cord in canvas
            msgGameOver.largura, msgGameOver.altura, //size image in canvas
        );
    },                                                                                                                               
};
//
//  [CHAO]
//
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentaçao = chao.x - movimentoDoChao;

            chao.x = movimentaçao % repeteEm;

        },
        draw() {
            context.drawImage (
                sprites, //sprite image
                chao.spriteX, chao.spriteY, //image x and y
                chao.largura, chao.altura, //solo image w and h
                chao.x, chao.y, //image cord in canvas
                chao.largura, chao.altura, //size image in canvas
            );
            
            context.drawImage (
                sprites, //sprite image
                chao.spriteX, chao.spriteY, //image x and y
                chao.largura, chao.altura, //solo image w and h
                (chao.x + chao.largura), chao.y, //image cord in canvas
                chao.largura, chao.altura, //size image in canvas
                );
            },                                                                                                                               
        };
        return chao;
    }
    
    function fazColisao() {
        const flappyBirdY = globais.flappyBird.y + globais.flappyBird.altura;
    const chaoY = globais.chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    };

    return false;
}
//
// [FLAPPYBIRD]
//
function criaFlappyBird() {
    const flappyBird = {
    
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        Pula() {
            console.log('devo pular!');
            flappyBird.veloc = - flappyBird.pulo;
        },
        gravidade: 0.25,
        veloc: 0,
        atualiza() {
            if(fazColisao(flappyBird, globais.chao)) {
                console.log('fez colisao!');
                som_HIT.play();

                switchTela(Telas.GAME_OVER);
                return;
            }
            flappyBird.veloc = flappyBird.veloc + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.veloc; 
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, },//asa pra cima
            {spriteX: 0, spriteY: 26,},//asa no meio
            {spriteX: 0, spriteY: 52,},//asa pra baixo
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
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
                flappyBird.x, flappyBird.y, //image cord in canvas
                flappyBird.largura, flappyBird.altura, //size image in canvas
            );
        },
    };
    return flappyBird;
}
//
// [CANOS]
//
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
            chao: {
                spriteX: 0,
                spriteY: 169,
            },
            ceu: {
                spriteX: 52,
                spriteY: 169,
            },
            espaco: 80,
        draw() {
                
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                    
                    // cano ceu
                    context.drawImage(
                        sprites,
                        canos.ceu.spriteX, canos.ceu.spriteY,
                        canos.largura, canos.altura,
                        canoCeuX, canoCeuY,
                        canos.largura, canos.altura,
                    )
                        // cano chao
                        const canoChaoX = par.x;
                        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                        context.drawImage (
                        sprites,
                        canos.chao.spriteX, canos.chao.spriteY,
                        canos.largura, canos.altura,
                        canoChaoX, canoChaoY,
                        canos.largura, canos.altura,
                    )

                    par.canoCeu = {
                        x: canoCeuX,
                        y: canos.altura + canoCeuY
                    }
                    par.canoChao = {
                        x: canoChaoX,
                        y: canoChaoY
                    }
                })
            },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
                
            if((globais.flappyBird.x + globais.flappyBird.largura - 5) >= par.x) {               
                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }
          
                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
                return false;
            },
        pares: [],
        atualiza() {
            const passou100frames = frames % 100 === 0; 
            if(passou100frames) {
                console.log('Passou 100 Frames');
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),                                        
                });
            }
                
            
            
            
            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)) {
                    console.log('Você perdeu');
                    som_HIT.play();
                    switchTela(Telas.GAME_OVER);
                }

                 if(par.x + canos.largura <= 0) {
                        canos.pares.shift();
                }
            });

        }
    }
        
        
    return canos;
}

function criaPlacar() {
    const placar = {
        pontuaçao: 0,
        draw() {
            context.font = '25px "VT323"';
            context.fillStyle = 'white';
            context.fillText(`${placar.pontuaçao}`, 300, 25);
        },
        atualiza() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
                placar.pontuaçao = placar.pontuaçao + 1;
            }
        }
    }
    return placar;
}


//
// [TELAS] 
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
            globais.canos = criaCanos();
        },
        draw() {
            planoDeFundo.draw();
            globais.flappyBird.draw();
            
            globais.chao.draw();
            msgGetReady.draw();
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
    inicializa() {
        globais.placar = criaPlacar();
    },
    draw() {
        planoDeFundo.draw();
        globais.canos.draw();
        globais.chao.draw();
        globais.flappyBird.draw();
        globais.placar.draw();
    },
    click() {
        globais.flappyBird.Pula();

    },
    update() {
        globais.chao.atualiza();
        globais.canos.atualiza()
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    draw() {
        msgGameOver.draw();
    },
    update() {

    },
    click() {
        switchTela(Telas.START);    
    }
}
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

window.addEventListener('keydown', function(e) {
    if (telaAtiva.click && !e.repeat && e.code === 'Space') {
      telaAtiva.click();
    }
  });

switchTela(Telas.START);
loop();  