var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
const Ant = (function() {
    const _Ant = function(args) {
        this.x = args.x;
        this.y = args.y;
        this.size = args.size;
        this.speed = 1 + ((args.speed) * 4) || 1;
        this.anim = {
            body: 0,
            abdomen: 0,
            feelers: {
                left: 0,
                right: 0
            },
            blink: {
                active: false,
                timer: 0
            }
        };
        this.legs = {
            fl: { //front right
                angles: [0, 0, 0]
            },
            fr: { //front left
                angles: [0, 0, 0]
            },
            ml: { //middle left
                angles: [0, 0]
            },
            mr: { //middle right
                angles: [0, 0]
            },
            bl: { //back left
               angles: [0, 0, 0] 
            },
            br: { //back right
                angles: [0, 0, 0]
            }
        };
        this.timer = 0;
    };
    _Ant.prototype = {
        update: function() {
            this.timer++;

            //body/feelers
            this.anim.body = -abs(sin(radians(this.timer * this.speed)) * 5);
            this.anim.abdomen = -abs(sin(radians(this.timer * this.speed)) * 8);
            this.anim.feelers.left = cos(radians(this.timer * this.speed * 2)) * 5;
            this.anim.feelers.right = sin(radians(this.timer * this.speed * 2)) * 5;
            
            //legs
            
            //front left
            this.legs.fl.angles[0] = 15 + sin(radians((this.timer + 90) * this.speed)) * 15;
            this.legs.fl.angles[1] = 90 + sin(radians((this.timer + 90) * this.speed)) * -20;
            this.legs.fl.angles[2] = -80 + sin(radians((this.timer + 180) * this.speed)) * 15;
            
            //front right
            this.legs.fr.angles[0] = 15 + sin(radians((this.timer - 90) * this.speed)) * 15;
            this.legs.fr.angles[1] = 90 + sin(radians((this.timer - 90) * this.speed)) * -20;
            this.legs.fr.angles[2] = -80 + sin(radians((this.timer) * this.speed)) * 15;
            
            //middle left
            this.legs.ml.angles[0] = 60 + sin(radians(this.timer * this.speed)) * 15;
            this.legs.ml.angles[1] = -70 + cos(radians(this.timer * this.speed)) * -15;
            
            //middle right
            this.legs.mr.angles[0] = 60 + sin(radians((this.timer + 180) * this.speed)) * 15;
            this.legs.mr.angles[1] = -70 + cos(radians((this.timer + 180) * this.speed)) * -20;
            
            //back left
            this.legs.bl.angles[0] = -20 + cos(radians((this.timer - 90) * this.speed)) * -15;
            this.legs.bl.angles[1] = -85 + cos(radians((this.timer - 90) * this.speed)) * 40;
            this.legs.bl.angles[2] = 0 - this.legs.bl.angles[1] + sin(radians((this.timer - 90) * this.speed)) * -15;
            
            //back right
            this.legs.br.angles[0] = -20 + cos(radians((this.timer + 90) * this.speed)) * -15;
            this.legs.br.angles[1] = -85 + cos(radians((this.timer + 90) * this.speed)) * 40;
            this.legs.br.angles[2] = 0 - this.legs.br.angles[1] + sin(radians((this.timer + 90) * this.speed)) * -15;
        },
        draw: function() {
            pushMatrix();
                translate(this.x, this.y + this.anim.body);
                
                //head
                noFill();
                
                //nose/mouth
                stroke(240, 200, 130);
                strokeWeight(this.size * 0.035);
                line(0, 0, -this.size * 0.11, this.size * 0.01);
                
                //feelers
                noFill();
                stroke(240, 200, 130);
                strokeWeight(this.size * 0.015);
                bezier( -this.size * 0.01, 0, 
                        -this.size * -0.01, -this.size * 0.12, 
                        -this.size * -0.02, -this.size * 0.19, 
                        -this.size * -0.01 + this.anim.feelers.left, -this.size * 0.29);
                bezier( -this.size * -0.06, 0, 
                        -this.size * -0.08, -this.size * 0.12, 
                        -this.size * -0.08, -this.size * 0.19, 
                        -this.size * -0.08 + this.anim.feelers.right, -this.size * 0.29);
                noStroke();
                fill(240, 200, 130);
                ellipse(-this.size * -0.01 + this.anim.feelers.left, -this.size * 0.29, this.size * 0.05, this.size * 0.05);
                ellipse(-this.size * -0.08 + this.anim.feelers.right, -this.size * 0.29, this.size * 0.05, this.size * 0.05);
                
                //middle right leg
                pushMatrix();
                    translate(this.size * 0.34, this.size * 0.12);
                    rotate(radians(this.legs.mr.angles[0]));
                    stroke(180, 145, 75);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.mr.angles[1]));
                    stroke(175, 110, 50);
                    line(0, 0, 0, this.size * 0.38);
                popMatrix();
                
                //front right leg
                pushMatrix();
                    translate(this.size * 0.22, this.size * 0.09);
                    rotate(radians(this.legs.fr.angles[0]));
                    stroke(180, 145, 75);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.fr.angles[1]));
                    stroke(175, 110, 50);
                    line(0, 0, 0, this.size * 0.08);
                    
                    translate(0, this.size * 0.08);
                    rotate(radians(this.legs.fr.angles[2]));
                    stroke(175, 110, 50);
                    line(0, 0, 0, this.size * 0.38);
                popMatrix();
                
                //back right leg
                pushMatrix();
                    translate(this.size * 0.41, this.size * 0.16);
                    rotate(radians(this.legs.br.angles[0]));
                    stroke(180, 145, 75);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.br.angles[1]));
                    stroke(175, 110, 50);
                    line(0, 0, 0, this.size * 0.08);
                    
                    translate(0, this.size * 0.08);
                    rotate(radians(this.legs.br.angles[2]));
                    stroke(175, 110, 50);
                    line(0, 0, 0, this.size * 0.33);
                popMatrix();
                
                //body
                noFill();
                stroke(125, 65, 25);
                strokeWeight(this.size * 0.09);
                line(this.size * 0.14, this.size * 0.02, this.size * 0.38, this.size * 0.15);
                line(this.size * 0.41, this.size * 0.15, this.size * 0.51, this.size * 0.09);
                
                stroke(145, 85, 40);
                strokeWeight(this.size * 0.18);
                line(0, this.size * 0.005, this.size * 0.09, 0);
                strokeWeight(this.size * 0.135);
                line(this.size * 0.24, this.size * 0.07, this.size * 0.41, this.size * 0.15);
                
                //abdomen
                pushMatrix();
                    translate(this.size * 0.47, this.size * 0.11);
                    rotate(radians(this.anim.abdomen));
                    translate(-this.size * 0.47, -this.size * 0.11);
                    
                    noStroke();
                    fill(145, 85, 40);
                    beginShape();
                        vertex(this.size * 0.47, this.size * 0.11);
                        bezierVertex(this.size * 0.41, this.size * -0.10, this.size * 0.62, -this.size * 0.23, this.size * 0.87, -this.size * 0.15);
                        bezierVertex(this.size * 0.88, this.size * 0.32, this.size * 0.44, this.size * 0.12, this.size * 0.47, this.size * 0.11);
                    endShape();
                    noFill();
                    stroke(185, 115, 55);
                    strokeWeight(this.size * 0.025);
                    bezier( this.size * 0.50, this.size * -0.02,
                            this.size * 0.54, this.size * -0.11,
                            this.size * 0.64, this.size * -0.13,
                            this.size * 0.69, this.size * -0.14);
                popMatrix();
                
                //eye        
                noStroke();
                fill(20);
                ellipse(this.size * 0.05, -this.size * 0.02, this.size * 0.05, this.size * 0.05);
                
                //middle left leg
                pushMatrix();
                    translate(this.size * 0.34, this.size * 0.12);
                    rotate(radians(this.legs.ml.angles[0]));
                    stroke(240, 200, 125);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.ml.angles[1]));
                    stroke(235, 165, 95);
                    line(0, 0, 0, this.size * 0.38);
                popMatrix();
                
                //front left leg
                pushMatrix();
                    translate(this.size * 0.22, this.size * 0.09);
                    rotate(radians(this.legs.fl.angles[0]));
                    stroke(240, 200, 125);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.fl.angles[1]));
                    stroke(235, 165, 95);
                    line(0, 0, 0, this.size * 0.08);
                    
                    translate(0, this.size * 0.08);
                    rotate(radians(this.legs.fl.angles[2]));
                    stroke(235, 165, 95);
                    line(0, 0, 0, this.size * 0.38);
                popMatrix();
                
                //back left leg
                pushMatrix();
                    translate(this.size * 0.41, this.size * 0.16);
                    rotate(radians(this.legs.bl.angles[0]));
                    stroke(240, 200, 125);
                    strokeWeight(this.size * 0.045);
                    line(0, 0, 0, this.size * 0.15);
                    
                    translate(0, this.size * 0.15);
                    rotate(radians(this.legs.bl.angles[1]));
                    stroke(235, 165, 95);
                    line(0, 0, 0, this.size * 0.08);
                    
                    translate(0, this.size * 0.08);
                    rotate(radians(this.legs.bl.angles[2]));
                    stroke(235, 165, 95);
                    line(0, 0, 0, this.size * 0.33);
                popMatrix();
                
            popMatrix();
        },
        run: function() {
            this.update();
            this.draw();
        }
    };
    return _Ant;
})();

const ant = new Ant({
    x: 200,
    y: 300,
    size: 300,
    speed: 2
});

const antSmall = new Ant({
    x: 480,
    y: 420,
    size: 100,
    speed: 3
});

draw = function() {
    background(79, 79, 79);
    
    ant.run();
    antSmall.run();
    
    //ground
    noStroke();
    fill(240, 200, 120);
    rect(0, 475, width, 125);
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);