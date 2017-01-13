var hextypes = {
    // aka flat-topped
    "horizontal": {
    	offset: 0
    },
    // aka pointy-topped
    "vertical": {
    	offset: 1
    }
};

var hex = {
	c: null,
	type: "horizontal",
	
	init: function() {
		hex.c = $("#c")[0];
		console.log(hex.c);
		
		// update on any window size change.
		window.addEventListener("resize", hex.redraw);

		// first draw
		hex.redraw();
	},

	redraw: function() {
		var offset = hextypes[hex.type].offset;
		
		var c = hex.c;
	    var cc = c.getContext("2d");
	    c.width = c.clientWidth;
	    c.height = c.clientHeight;

	    var x = Math.random() * (c.width - 200) + 100;
	    var y = Math.random() * (c.height - 200) + 100;
	    var point = new Point(x, y);
	    var r = 50;
	    	    
	    var poly = hex.hexArray(point, r, 6, offset);
	    hex.drawPoly(cc, poly);
	    
	    setTimeout("hex.redraw()", 100);
	},
	
	drawPoly: function(cc, poly) {
		var point1 = poly[poly.length - 1];
		var point2 = poly[0];
		hex.drawLine(cc, point1, point2);

		for (var i=0; i < poly.length - 1; i++) {
			point1 = poly[i];
			point2 = poly[i + 1];
			hex.drawLine(cc, point1, point2);
		}
	},

	drawLine: function(cc, point1, point2) {
		var x1 = Math.floor(point1.x);
		var y1 = Math.floor(point1.y);
		var x2 = Math.floor(point2.x);
		var y2 = Math.floor(point2.y);
		
		//console.log([point1, point2]);
		console.log([x1, x2, y1, y2]);
		
		cc.beginPath();
		cc.moveTo(x1, y1);
		cc.lineTo(x2, y2);
		cc.stroke();
	},

	hexArray: function(point, r, n, offset) {
		var arr = [];
		for (var i = 0; i <= n; i++) {
			var point = hex.hexCorner(point, r, n, i, offset);
			arr.push(point);
		}
		return arr;
	},
	
	hexCorner: function(point, r, n, i, offset) {
		var deg = 360.0 / n * i + offset * 180.0 / n;		
	    var radians = Math.PI / 180.0 * deg;
	    var x = point.x + r * Math.cos(radians);
	    var y = point.y + r * Math.sin(radians);
	    return new Point(x, y);
	}
};

$(function() {
	hex.init();
});
