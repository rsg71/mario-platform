kaboom({
    global: true,
    fullScreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1]
})

const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;


loadRoot("sprites/");
loadSprite('coin', 'coin.png');
loadSprite('evil-shroom', 'evil-shroom.png');
loadSprite('brick', 'brick.png');
loadSprite("block", "block.png");
loadSprite('mario', 'mario.png');
loadSprite('mushroom', 'mushroom.png');
loadSprite('surprise', 'surprise.png');
loadSprite('unboxed', 'unboxed.png');
loadSprite('pipe-top-left', 'pipe-top-left.png');
loadSprite('pipe-top-right', 'pipe-top-right.png');
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png');
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png');

loadSprite('blue-block', 'blue-block.png');
loadSprite('blue-brick', 'blue-brick.png');
loadSprite('blue-steel', 'blue-steel.png');
loadSprite('blue-evil-shroom', 'blue-evil-shroom.png');
loadSprite('blue-surprise', 'blue-surprise.png');


scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const maps = [
        [
            '                                   ',
            '                                   ',
            '                                   ',
            '                                   ',
            '     %  =%=%=                      ',
            '                                   ',
            '                         -+        ',
            '                ^  ^     ()        ',
            '===========================  ======'
        ],
        [
            '~                                   ~',
            '~                                   ~',
            '~                                   ~',
            '~                                   ~',
            '~       @@@@@@               x      ~',
            '~                         x  x      ~',
            '~                      x  x  x    -+~',
            '~             z  z   x x  x  x    ()~',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
        ]
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block', solid())],
        '$': [sprite('coin')],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evil-shroom'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '~': [sprite('blue-brick'), solid(), scale(0.5)],
        'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
        'x': [sprite('blue-steel'), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(maps[level], levelCfg);

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('level ' + parseInt(level + 1) + pos(40, 6))]);

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])



    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })






    keyPress('space', () => {
        if (player.grounded()) {
            player.jump(JUMP_FORCE)
        }
    })

});



scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2), height() / 2]);
})


start("game", { level: 0, score: 0 });