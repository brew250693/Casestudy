let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

class Branche {
    x=100;
    y=100;
    r=10;
    direction = 150;
    speed = 2 ;
    force = 1;

    update(){

        let result = [];
        this.r -= this.r * 0.01;

        let dire = Math.PI * this.direction / 100;
        this.x += Math.cos(dire) * this.speed;
        this.y += Math.sin(dire) * this.speed;
        this.direction += this.force;

        if (Math.random() < 0.02){
            let b = new Branche();
            b.randomData(this);
            result.push(b);
        }

        return result;


    }

    draw (ctx) {
        ctx.beginPath();
        ctx.fillStyle  = "#fff";
        ctx.arc(this.x,this.y,this.r , 0 , 2*Math.PI);
        ctx.fill();
    }

    randomData( parent ){
        let x = 0;
        let y = 0;
        let speed = 1 * Math.random() + 0.02;
        let dire = 150;
        let r = 3;

        if(parent!=null){
            x = parent.x;
            y = parent.y;
            r = parent.r * 0.95;
            dire = parent.direction;
        }

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = dire;
        this.r = r;
        this.force = 0.5 * Math.random() - 0.25;


    }


}
let brancheList = [];
for (let i = 0; i<5; i++){
    let branche = new Branche();
    branche.randomData();
    branche.x = canvas.width * Math.random();
    branche.y = canvas.height;
    brancheList.push(branche);
}



function update() {

    let divisionList = [];

    for (let i = 0;i < brancheList.length; i++){
        let branche = brancheList [i];
        let result = branche.update();
        branche.draw(ctx);
        divisionList = divisionList.concat(result);
    }


    brancheList = brancheList.concat( divisionList );

}

setInterval(update , 1000 / 30);