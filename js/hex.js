var hex = {
	c: null,
	
	init: function() {
		hex.c = $("#c")[0];
		console.log(hex.c);
		
		// update on any window size change.
		window.addEventListener("resize", function () {hex.redraw();});

		// first draw
		hex.redraw();
	},

	redraw: function() {
		console.log("redraw");
		
		var c = hex.c;
	    var cc = c.getContext("2d");
	    c.width = c.clientWidth;
	    c.height = c.clientHeight;

	    var r = 50;
	    var dw = c.width / (Math.sqrt(3.0) * r);
	    var dy = c.height / (Math.sqrt(3.0) * r);
	    
	    for (var i = 0; i < dw; i++) {
		    for (var j = 0; j < dy; j++) {
		    	var x = i * Math.sqrt(3.0) * r + (j % 2 * Math.sqrt(3.0) / 2.0) * r + r;
		    	var y = (j * r * 1.5) + r;
			    var point = new Point(x, y);
			    var poly = hex.hexArray(point, r, 6, 1);
				cc.strokeStyle = '#cccccc';
				cc.fillStyle = '#cccccc';
			    hex.drawPoly(cc, poly);

				cc.fillStyle = '#000066';
				cc.strokeStyle = '#000066';
			    hex.drawPoint(cc, point);
			    cc.fillText([i,j], point.x-5, point.y-5);
		    }
	    }	    
	},
	
	drawPoint: function(cc, point) {
		cc.beginPath();
		cc.arc(point.x, point.y, 1, 0, 2 * Math.PI, true);
		cc.stroke();
	},

	drawPoly: function(cc, poly) {
		for (var i=0; i < poly.length - 1; i++) {
			point1 = poly[i];
			point2 = poly[i + 1];
			hex.drawLine(cc, point1, point2);
		    //cc.fillText([i], point1.x, point1.y);
		}
	},

	drawLine: function(cc, point1, point2) {
		var x1 = Math.floor(point1.x);
		var y1 = Math.floor(point1.y);
		var x2 = Math.floor(point2.x);
		var y2 = Math.floor(point2.y);
		
		cc.beginPath();
		cc.moveTo(x1, y1);
		cc.lineTo(x2, y2);
		cc.stroke();
	},

	hexArray: function(point, r, n, offset) {
		var arr = [];
		for (var i = 0; i <= n; i++) {
			var hexPoint = hex.hexCorner(point, r, n, i, offset);
			arr.push(hexPoint);
		}
		return arr;
	},
	
	hexLog: function(s) {
		if (window.console) {
			console.log(s);
		}
	},
	
	hexCorner: function(point, r, n, i, offset) {
	    var deg = 360.0 * ( i / n + offset / (2.0 * n));
	    var radians = Math.PI / 180.0 * deg;
	    var dx = r * Math.cos(radians);
	    var dy = r * Math.sin(radians);
	    var x = point.x + dx;
	    var y = point.y + dy;
	    
	    //hex.hexLog("point[" + point.x + "," + point.y + "]");
		//hex.hexLog("radians[" + radians + "]");
	    //hex.hexLog("dx[" + dx + "], dy[" + dy + "]");
	    //hex.hexLog("x[" + x + "], y[" + y + "]");
	    
	    return new Point(x, y);
	}
};

$(function() {
	hex.init();
});