import { GameEngine, BaseTypes, DynamicObject, SimplePhysicsEngine, TwoVector, KeyboardControls } from 'lance-gg';

// /////////////////////////////////////////////////////////
//
// GAME OBJECTS
//
// /////////////////////////////////////////////////////////
class Player extends DynamicObject {

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
    }

    static get netScheme() {
        return Object.assign({
            health: { type: BaseTypes.TYPES.INT16 }
        }, super.netScheme);
    }

    syncTo(other) {
        super.syncTo(other);
        this.health = other.health;
    }
}


// /////////////////////////////////////////////////////////
//
// GAME ENGINE
//
// /////////////////////////////////////////////////////////
export default class Game extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });
    
        // common code
        this.on('postStep', this.gameLogic.bind(this));
    
        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));
    
        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
    }
    
    registerClasses(serializer) {
        serializer.registerClass(Player);
    }

    gameLogic() {
    }

    processInput(inputData, playerId) {
        super.processInput(inputData, playerId);
    
        // get the player paddle tied to the player socket
        let player = this.world.queryObject({ playerId });
        if (player) {
            if (inputData.input === 'up') {
                player.position.y -= 5;
            } else if (inputData.input === 'down') {
                player.position.y += 5;
            } else if (inputData.input === 'left') {
                player.position.x -= 5;
            } else if (inputData.input === 'right') {
                player.position.x += 5;
            }
        }
    }


    // /////////////////////////////////////////////////////////
    //
    // SERVER ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    serverSideInit() {

        // create the paddle objects
        //this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(PADDING, 0) }));
    
    }

    // attach newly connected player to next available paddle
    serverSidePlayerJoined(ev) {
        let player = this.addObjectToWorld(new Player(this, null, { position: new TwoVector(100, 100)}))
        player.playerId = ev.playerId;
    }

    serverSidePlayerDisconnected(ev) {
        let player = this.world.queryObjects({ instanceType: Player });
        for(var i = 0; i < player.length; i++)
            if(player[i].playerId == ev.playerId) 
                this.removeObjectFromWorld(player[i].id);
    }


    // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    clientSideInit() {
        this.controls = new KeyboardControls(this.renderer.clientEngine);
        this.controls.bindKey('up', 'up', { repeat: true } );
        this.controls.bindKey('down', 'down', { repeat: true } );
        this.controls.bindKey('left', 'left', { repeat: true } );
        this.controls.bindKey('right', 'right', { repeat: true } );
    }
    
    clientSideDraw() {
    
        let players = this.world.queryObjects({ instanceType: Player });
        if (!players) return;
        var gamePanel = document.querySelector('.GamePanel');
        gamePanel.innerHTML = "";
        for(var i = 0; i < players.length; i++) {
            var div = document.createElement('div');

            div.classList.add(`.player${players[i].playerId}`)
            div.style.width = '10px';
            div.style.height = '10px';
            div.style.position = "absolute"
            div.style.top = players[i].position.y + 10;
            div.style.left = players[i].position.x;
            div.style.border = "solid 1px red";

            gamePanel.appendChild(div);
        }

    }
}
