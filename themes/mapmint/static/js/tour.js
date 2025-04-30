var map;
var lonlat;
var OSMgs;
var cycle;
    
function init() {
		
	 if (!OpenLayers.CANVAS_SUPPORTED) {
                var unsupported = OpenLayers.Util.getElement('unsupported');
                unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
            }

            OSMgs = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {
            	opacity: 0.2,
                eventListeners: {
                    tileloaded: function(evt) {
                        var ctx = evt.tile.getCanvasContext();
                        if (ctx) {
                            var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);
                            var pix = imgd.data;
                            for (var i = 0, n = pix.length; i < n; i += 4) {
                                pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;
                            }
                            ctx.putImageData(imgd, 0, 0);
                            evt.tile.imgDiv.removeAttribute("crossorigin");
                            evt.tile.imgDiv.src = ctx.canvas.toDataURL();
                        }
                    }
                }
            });
    
    map = new OpenLayers.Map('map3', {
    	projection: "EPSG:900913",
    controls: []
    });

    map.addLayers([OSMgs]);
    
    var attr = new OpenLayers.Control.Attribution();
    map.addControl(attr);

    map.setCenter(new OpenLayers.LonLat(135.52242994308472,34.700478315353394).transform(
        new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()
    ), 15);
    
     var movingMap = window.setInterval(function() {
        map.moveByPx(0.1,0.5);
	}, 50);
 	
}




 



  
    
