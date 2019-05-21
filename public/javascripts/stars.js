let stars = [];
$(document).ready(function() {
    sky.start();
    spawnStars();

    requestAnimationFrame(updateSky);
    window.addEventListener('resize', rescale);
});

function rescale() {
    sky.width = $("#intro").width();
    sky.height = $("#intro").height();

    sky.start();
    spawnStars();
}

function spawnStars() {
    let num_stars = Math.floor($("#intro").width() / 8);
    stars = [];
    for (i = 0; i < num_stars; i++) {
        stars.push(spawnStar(canvas));
    }
}

function spawnStar(canvas) {
    // generate random position
    var maxX = sky.width;
    var maxY = sky.height;
    var randomX = Math.random() * maxX;
    var randomY = Math.random() * maxY;

    // random radius
    var radius = Math.random() * 5;

    // random opacity
    var opacity = Math.random();

    var starChild = new star(radius, opacity, randomX, randomY);
    starChild.update();
    return starChild;
}

let sky = {
    canvas : document.getElementById('canvas'),
    dpr : window.devicePixelRatio || 1,
    width : $("#intro").width(),
    height : $("#intro").height(),
    start : function() {
        var rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.dpr, this.dpr);
        this.context.shadowBlur = Math.floor((Math.random()*15)+5);
        this.context.shadowColor = "white";
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function star(radius, opacity, x, y) {
    this.radius = radius;
    this.radius_increasing = Boolean(Math.round(Math.random()));
    this.opacity = opacity;
    this.opacity_increasing = Boolean(Math.round(Math.random()));
    this.x = x;
    this.y = y;
    this.x_increasing = Boolean(Math.round(Math.random()));
    this.y_increasing = Boolean(Math.round(Math.random()));
    this.update = function() {
        ctx = sky.context;
        ctx.save();

        // radius
        var current_radius = this.radius;
        var radius_change = Math.random() / 50;
        if (this.radius_increasing == true && current_radius < 5) {
            this.radius = current_radius + radius_change;
        } else {
            this.radius_increasing = false;
        }
        if (this.radius_increasing == false && current_radius - radius_change > 0) {
            this.radius = current_radius - radius_change;
        } else {
            this.radius_increasing = true;
        }

        // opacity
        var current_opacity = this.opacity;
        var opacity_change = 0.001;

        if (this.opacity_increasing == true && current_opacity < 1) {
            this.opacity = current_opacity + opacity_change;
        } else {
            this.opacity_increasing = false;
        }
        if (this.opacity_increasing == false && current_opacity - opacity_change > 0) {
            this.opacity = current_opacity - opacity_change;
        } else {
            this.opacity_increasing = true;
        }

        // position
        current_x = this.x;
        x_change = Math.random() / 10;
        if (this.x_increasing == true && current_x < sky.width) {
            this.x = current_x + x_change;
        } else {
            this.x_increasing = false;
        }
        if (this.x_increasing == false && current_x - x_change > 0) {
            this.x = current_x - x_change;
        } else {
            this.x_increasing = true;
        }

        current_y = this.y;
        y_change = Math.random() / 10;
        if (this.y_increasing == true && current_y < sky.height) {
            this.y = current_y + y_change;
        } else {
            this.y_increasing = false;
        }
        if (this.y_increasing == false && current_y - y_change > 0) {
            this.y = current_y - y_change;
        } else {
            this.y_increasing = true;
        }

        // update star
        ctx.fillStyle = "white";
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    };
}

function updateSky() {
    sky.clear();
    for (let starChild of stars) {
        starChild.update();
    }
    requestAnimationFrame(updateSky);
}
