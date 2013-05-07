/* By: Alain Fontaine */

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.entities.helicopter',
	'game.levels.main'
)
.defines(function(){

	
MyGame = ig.Game.extend({
	
	// Load a font
	//font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 100,
	score: 0,
	fractScore: 0,
	levelNums: [1, 2, 3],
	scoreText: $( "#score" )[0],
	lifeText: $('#life')[0],
	currentLevelText: $('#level')[0],
	life: 1000,
	heliSpeedX: 100,
	heliSpeedY: 75,
	currentLevel: 1,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.MOUSE1, 'up' );

		ig.input.bind(ig.KEY.P, "pause");

		this.loadLevel( LevelMain );

		this.scoreText.innerHTML = this.score;
		this.currentLevelText.innerHTML = this.currentLevel;

	},
	
	update: function() {

		if(!ig.input.state('pause') && this.pausing) this.pausing=false;

        if (ig.input.state("pause")) {
            if (!this.pausing) {
                this.paused = (this.paused) ? false : true;
                this.pausing = true;
            };
        };

        if (this.paused) return;
		
		this.parent();
		
		this.fractScore += 1;
		if( this.fractScore % 5 == 0 ) {
			this.score += 1;
			this.scoreText.innerHTML = this.score;
		}
		
		var heli = this.getEntitiesByType( EntityHelicopter )[0];



		if( this.screen.x > 1410 ) {
			heli.pos.x = 0;
			this.heliSpeedX += 25;
			this.heliSpeedY += 10;
			this.currentLevel += 1;
			this.currentLevelText.innerHTML = this.currentLevel;
		}

		this.screen.x = heli.pos.x - 80;

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		// x = game.entities.helicopter.pos.x - (ig.system.width / 2);
		// y = game.entities.helicopter.pos.y - (ig.system.height / 2);
		// this.screen.x = (x > 0 && x < this._mapWidth) ? x : this.screen.x;
		// this.screen.y = (y > 0 && y < this._mapHeight) ? y : this.screen.y;
		
		
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 700, 400, 1 );

});
