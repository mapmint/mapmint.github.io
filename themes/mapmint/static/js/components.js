var map;
var lonlat;
var baseOSM, osm, OSMgs;
var cycle;
var $j = jQuery.noConflict();
var $ = $j;

$(function($) {

	
	
	 if (!OpenLayers.CANVAS_SUPPORTED) {
                var unsupported = OpenLayers.Util.getElement('unsupported');
                unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
            }

            OSMgs = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {
            	opacity: 1,
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

    map = new OpenLayers.Map('map6', {
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

      },
      100
    );
 




$("li.pg a").hover(
  function () {
    $("li.pg h3").css('color', '#3f7aa1');
  }, 
function() {
        $("li.pg h3").css('color', '')
    }
);

$("li.rd a").hover(
  function () {
    $("li.rd h3").css('color', '#fc0204');
  },
 function() {
        $("li.rd h3").css('color', '#707070')
    }
);

$("li.gr a").hover(
  function () {
    $("li.gr h3").css('color', '#008f00');
  },
 function() {
        $("li.gr h3").css('color', '#707070')
    }
);

$("li.rp a").hover(
  function () {
    $("li.rp h3").css('color', '#8597be');
  },
 function() {
        $("li.rp h3").css('color', '#707070')
    }
);  

$("li.cg a").hover(
  function () {
    $("li.cg h3").css('color', '#ffea00');
  },
 function() {
        $("li.cg h3").css('color', '#707070')
    }
);

});


