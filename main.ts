function spawn_ufo (x_pos: number, y_pos: number) {
    ufo = sprites.create(assets.image`ufo`, SpriteKind.Enemy)
    ufo.setPosition(x_pos, y_pos)
    ufo.vx = level
}
function on_start () {
    info.setScore(0)
    ship.setPosition(80, 110)
    ship.setStayInScreen(true)
    controller.moveSprite(ship, 100, 0)
    new_round()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    proj = sprites.createProjectileFromSprite(assets.image`laser`, ship, 0, -100)
})
function player_lose (ship: Sprite, enemy: Sprite) {
    game.over(false)
}
function change_direction_and_descend () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vx = value.vx * -1
        value.x += value.vx / level
        value.y += 4
    }
}
function new_round () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    level += 1
    x_pos = 16
    y_pos = 10
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 9; index++) {
            spawn_ufo(x_pos, y_pos)
            x_pos += 16
        }
        x_pos = 16
        y_pos += 8
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(100)
    if (sprites.allOfKind(SpriteKind.Enemy).length < 1) {
        new_round()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    player_lose(sprite, otherSprite)
})
let y_pos = 0
let x_pos = 0
let proj: Sprite = null
let ufo: Sprite = null
let level = 0
let ship: Sprite = null
ship = sprites.create(assets.image`ship`, SpriteKind.Player)
level = 0
on_start()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.left < 0 || value.right > 160) {
            change_direction_and_descend()
            break;
        }
    }
})
