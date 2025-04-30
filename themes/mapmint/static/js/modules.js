var map;
var lonlat;
var baseOSM, osm, OSMgs;
var cycle;
    
function init() {
	
	
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
 
}

   
function osm_getTileURL(bounds) {
 var res = this.map.getResolution();
 var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
 var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
 var z = this.map.getZoom();
 var limit = Math.pow(2, z);
 
 if (y < 0 || y >= limit) {
  return OpenLayers.Util.getImagesLocation() + "404.png";
 } else {
  x = ((x % limit) + limit) % limit;
  return this.url + z + "/" + x + "/" + y + "." + this.type;
 }
}

function zoomto(x,y,z) {
    var point = new OpenLayers.LonLat(x,y);
    point.transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject());
    map.setCenter(point, z);
}
    
Reveal.initialize({
        controls: true,
        progress: false,
	history: true,
	center: true,
        minScale: 1.0,
        maxScale: 1.0,
	theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
	transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none
        dependencies: [
		{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
		{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		//{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		//{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
	        //{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
		]
	});
 
var $j = jQuery.noConflict();
var $ = $j;
$(function($) {
	init();
$('.mdm').click(function(){
 $('body').animate({
         scrollTop: $(".mdmb").offset().top
     }, 800);
});

$('.mda').click(function(){  
 $('body').animate({
         scrollTop: $(".mdab").offset().top
     }, 1000);
});

$('.mmm').click(function(){
 $('body').animate({
         scrollTop: $(".mmmb").offset().top
     }, 1300);
});

$('.mpm').click(function(){
 $('body').animate({
         scrollTop: $(".mpmb").offset().top
     }, 1800);
});
});



  
    
