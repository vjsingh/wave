define(['js/Static', 'js/IterDraw'], function(Static, IterDraw) {

    window.REFRESH_RATE = 40;
    window.requestAFrame = (function(callback) {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) {
                window.setTimeout(callback, 1000/window.REFRESH_RATE);
            };
    })();

    return function World() {
        return IterDraw({
            init: function init() {
                this.world = this;
                this.context = this.canvas.getContext('2d');
                this.time = this.getTime();

                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.updateWorld();
            },

            getTime: function getTime() {
                return (new Date()).getTime();
            },

            animate: function animate() {
                // Get time change
                this.delta = this.getTime() - this.time;

                // Clear the screen
                this.context.clearRect(0, 0, this.width, this.height);
                // Draw the screen
                this.draw(this.delta);

                // Set the new time and do it again
                this.time = this.time + this.delta;
                if (!this.stop) {
                    window.requestAFrame(this.animate.bind(this));
                }
            },

            playPause: function stop() {
                this.stop = !this.stop;
                if (!this.stop) {
                    this.animate();
                }
            },

            start: function start() {
                this.stop = false;
                this.animate();
            }
        }, Static.compile(arguments));
    };
});
