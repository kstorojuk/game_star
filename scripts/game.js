import Stars from './stars.js'
import MenuScene from './menu.js';
import Background from './backgroung.js';

export default class GameScene {
       
    constructor(game){
        this.game = game
        this.stars = []
        this.Init()
        
    }

    Init(){
        for (let i = 0; i< 200; i++) {
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
        this.background = new Background(this.game) 
    }

    update(dt){
        this.stars.forEach(
            (star, index) => {
                if(star.position.y > this.game.canvas.height){
                    this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -5))
                }
                star.update(dt)
            })

        this.background.update(dt)
        
        if(this.game.checkKeyPressed('Escape')){
            this.game.setScene(MenuScene);
        }
    }

    render (dt, ctx, canvas) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.background.render(dt, ctx, canvas)

        this.stars.forEach(
        (star, index) => {
            star.render(dt, ctx, canvas)
        })

    }  
}