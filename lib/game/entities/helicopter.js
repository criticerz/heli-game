/* By: Alain Fontaine */

ig.module( 
    'game.entities.helicopter' 
)
.requires(
    'impact.entity'
)
.defines(function(){

    // code for this module

    EntityHelicopter = ig.Entity.extend({

    	size: {x: 35, y: 35},
    	maxVel: {x: 500, y: 400},
    	//collides: ig.Entity.COLLIDES.LITE,
    	animSheet: new ig.AnimationSheet( 'media/helicopter.png', 35, 35),

   		init: function(x, y, settings) {
   			this.parent(x, y, settings);

   			this.addAnim( 'idle', 1, [0]);

   			this.friction = 0;
   			this.vel.x = ig.game.heliSpeedX;
   			this.vel.y = ig.game.heliSpeedY;

   			this.currentAnim.angle = 0;

   		},
   		
   		update: function(x, y, settings) {
   			this.parent(x, y, settings);
   			
   			this.vel.x = ig.game.heliSpeedX;


   			if( ig.input.state('up') ) {
   				this.vel.y = ig.game.heliSpeedY * -1;

				
   				if( this.currentAnim.angle > 0 )
   					this.currentAnim.angle -= .01;

   			} else {

   				if( this.currentAnim.angle < .5 )
   					this.currentAnim.angle += .01;

   				this.vel.y = ig.game.heliSpeedY;
   			}

   		},

   		handleMovementTrace: function( res ) {
		    if( res.collision.x || res.collision.y ) {


		    	if( ig.game.fractScore % 5 == 0 ) {
					ig.game.score -= 1;
					ig.game.scoreText.innerHTML = ig.game.score;
				}


				ig.game.life -= 5;

				if( ig.game.life < 0 ) {

					ig.system.stopRunLoop.call(ig.system);
					$('#gameover').modal('show');

					$('#final_score').text(ig.game.score);
					$('#final_level').text(ig.game.currentLevel);
					

					$('#gameover').on('hidden', function() {
						ig.system.setGame(MyGame);
						ig.game.lifeText.style.width = 100 + "%";
					});
					
				}

				
				ig.game.lifeText.style.width = ig.game.life/10 + "%";

		    }

		    this.vel.x = ig.game.heliSpeedX;
		    // Continue resolving the collision as normal
		    this.parent(res); 
		},

    });

});