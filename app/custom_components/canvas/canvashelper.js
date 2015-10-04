(function(realWindow) {
    'use strict';
    if (!realWindow) {
        return;
    }
    var // get wrapped window if using Shadow DOM polyfill
        window = (function () {
            // create a TextNode
            var el = realWindow.document.createTextNode('');

            // check if it's wrapped by a polyfill
            if (el.ownerDocument !== realWindow.document
                && typeof realWindow.wrap === 'function'
                && realWindow.wrap(el) === el) {
                // return wrapped window
                return realWindow.wrap(realWindow);
            }

            // no Shadow DOM polyfil or native implementation
            return realWindow;
        }());
    function CanvasHelper(){};
    CanvasHelper.prototype = {
        getMousePos: function(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        },
        drawArrowHead: function(canvas, startVector, endVector) {
            var ctx = canvas.getContext('2d');
            var originalStart = startVector.clone();
            var originalEnd = endVector.clone();
            var distance = startVector.distance(endVector);
            var h = 10 * Math.sqrt(3);
            var w = 10;
            var U = endVector.subtract(startVector);
            U = U.norm();
            var newDistance = distance - 5;
            var newEndVector = startVector.clone().add(U.clone().multiply(Victor(newDistance, newDistance)));


            ctx.beginPath();
            var umulti = U.clone().multiply(Victor(h, h));
            // ctx.moveTo(originalEnd.x, originalEnd.y);

            var dest = originalEnd.clone().add(umulti); // 20 down
            this.convertToCanvasCoordinates(dest);

            var V1 = new Victor(-(U.y), U.x);
            var v1Dist = dest.clone().add(V1.multiply(Victor(w, w)));
            var V2 = new Victor(U.y, -(U.x));
            var v2Dist = dest.clone().add(V2.multiply(Victor(w, w)));
            //convertToCanvasCoordinates(v2Dist);
            //convertToCanvasCoordinates(v1Dist);


            //ctx.moveTo(dest.x, dest.y);
            ctx.strokeStyle = '#03A9F4';
            ctx.lineCap = 'square';
            ctx.lineWidth = 3;
            //ctx.stroke();
            ctx.moveTo(v1Dist.x, v1Dist.y);
            ctx.lineTo(newEndVector.x, newEndVector.y);
            ctx.stroke();
            ctx.moveTo(v2Dist.x, v2Dist.y);
            ctx.lineTo(newEndVector.x, newEndVector.y);
            ctx.stroke();
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(originalStart.x, originalStart.y);
            ctx.lineTo(newEndVector.x, newEndVector.y);
            ctx.stroke();

        },
        fitToContainer: function(canvas) {
            // Make it visually fill the positioned parent
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            // ...then set the internal size to match
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        },
        clearCanvas: function(canvas) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        drawGrid: function(canvas) {
            var ctx = canvas.getContext('2d');
            this.clearCanvas(canvas);
            ctx.strokeStyle = 'lightgrey';
            for (var i = 0; i < canvas.height; i += 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }
            for (var i = 0; i < canvas.width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.width);
                ctx.stroke();
            }

        },
        convertToCanvasCoordinates: function(vec) {
            if (vec.x < 0) {
                vec.x = Math.abs(vec.x);
            }
            if (vec.y < 0) {
                vec.y = Math.abs(vec.y);
            }
        }
    }



    /* global exports: true, module, define */

    realWindow.ch = new CanvasHelper();

}(typeof window === 'undefined' ? undefined : window));
