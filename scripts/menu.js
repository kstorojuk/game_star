import IntroScene from "./intro.js"
import GameScene from "./game.js"
import ExitScene from "./exit.js"


export default class MenuScene{

    constructor(game){
        this.game = game
        this.opacityDirection = 500
        this.menuActiveOpacity = 0
        this.menuIndex = 0
        this.menuTitle = 'Game Menu'
        this.menuItems = [
            'Start game',
            'Intro Scene',
            'Exit'
        ]
    }

    update(dt){
        let opacityValue = this.menuActiveOpacity + dt / this.opacityDirection

        if (opacityValue > 1 || opacityValue < 0 ) this.opacityDirection *= -1

        this.menuActiveOpacity += dt / this.opacityDirection

        if(this.game.checkKeyPressed('ArrowDown')){
            this.menuIndex ++
            this.menuIndex %= this.menuItems.length
        } else if (this.game.checkKeyPressed('ArrowUp')) {
            
            this.menuIndex--
            if (this.menuIndex < 0) {
                this.menuIndex = this.menuItems.length -1
            }
        }

        if (this.game.checkKeyPressed('Enter')) {
            switch(this.menuIndex){
                case 0 : this.game.setScene(GameScene); break
                case 1 : this.game.setScene(IntroScene); break
                case 2 : this.game.setScene(ExitScene); break


            }

        }
    }

    render(dt, ctx, canvas){
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    
        ctx.font = '100px Helvetica'
        ctx.textBaseline = 'top'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(this.menuTitle, (canvas.width - ctx.measureText(this.menuTitle).width)/2, 140)
    
        const ItemHeight = 50, fontsize = 40

        ctx.font = fontsize + 'px Helvetica'

        for(const [index,item] of this.menuItems.entries()){
            if (index === this.menuIndex) {
                ctx.globalAlpha = this.menuActiveOpacity
                ctx.fillStyle = '#089cd3'
                ctx.fillRect(0, canvas.height/2 + index * ItemHeight, canvas.width, ItemHeight)
            }

            ctx.globalAlpha = 1
            ctx.fillStyle = '#fff'
            ctx.fillText(item,(canvas.width - ctx.measureText(item).width) / 2, canvas.height/2 + index * ItemHeight + (ItemHeight - fontsize) / 2)

        }
    
    }































}