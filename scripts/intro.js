import MenuScene from "./menu.js"

export default class IntroScene{

    constructor(game){
        this.logoRevealTime = 2000
        this.textTypingTime = 2000
        this.sceneDisplayTime = 4000

        this.elepsedTime = 0
        this.bigText = "intro"
        this.infoText = "this is......game"

        this.game = game
    }
    
    update(dt){
        this.elepsedTime += dt

        if(this.elepsedTime > this.sceneDisplayTime || this.game.checkKeyPressed('Escape')){
            this.game.setScene(MenuScene);
        }
    }

    render (dt, ctx, canvas) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.globalAlpha = Math.min(1, this.elepsedTime / this.logoRevealTime)

        
        ctx.font = '100px Helvetica'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(this.bigText, (canvas.width - ctx.measureText(this.bigText).width)/2, canvas.height/2)

        if (this.elepsedTime >= this.logoRevealTime){
            let textProgress = Math.min(1, (this.elepsedTime - this.logoRevealTime)/ this.textTypingTime)
            ctx.font = '40px Helvetica'
            ctx.fillStyle = '#00FF00'

            ctx.fillText(
                this.infoText.substr(0, Math.floor(this.infoText.length * textProgress)),
            (canvas.width - ctx.measureText(this.infoText).width) / 2,
            canvas.height / 2 + 100 
            )
        }
    }
}