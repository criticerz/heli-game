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
	
	// Default variables (accessible everywhere)
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

		// Make helicopter go up
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.MOUSE1, 'up' );

		// Pause keys
		ig.input.bind(ig.KEY.P, "pause");

		// Load the main level
		this.loadLevel( LevelMain );

		// Load default scores
		this.scoreText.innerHTML = this.score;
		this.currentLevelText.innerHTML = this.currentLevel;

	},
	
	update: function() {

		// Pause game
		if(!ig.input.state('pause') && this.pausing) this.pausing=false;
        if (ig.input.state("pause")) {
            if (!this.pausing) {
                this.paused = (this.paused) ? false : true;
                this.pausing = true;
            };
        };
        if (this.paused) return;
		
		// Load parent functions
		this.parent();
		
		// Update score
		this.fractScore += 1;
		if( this.fractScore % 5 == 0 ) {
			this.score += 1;
			this.scoreText.innerHTML = this.score;
		}
		

		// Call helicopter and have screen reset at end of level
		var heli = this.getEntitiesByType( EntityHelicopter )[0];

		if( this.screen.x > 1410 ) {
			heli.pos.x = 0;
			this.heliSpeedX += 25;
			this.heliSpeedY += 10;
			this.currentLevel += 1;
			this.currentLevelText.innerHTML = this.currentLevel;
		}

		// Make screen follow helicopter
		this.screen.x = heli.pos.x - 80;

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});

ig.main( '#canvas', MyGame, 60, 700, 400, 1 );

});
