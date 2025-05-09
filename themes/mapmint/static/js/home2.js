var map;
var lonlat;
var gsat, gmap, gphy, ghyb, streetlayer;
var baseOSM, osm, OSMgs;
var cycle;
var topoLayer;
var cyclOSMLayer;
var humanOSMLayer;
var positronLayer;

    
function init() {
	 if (!OpenLayers.CANVAS_SUPPORTED) {
                var unsupported = OpenLayers.Util.getElement('unsupported');
                unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
            }

            OSMgs = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {
            	opacity: 0.6,
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
  
    map = new OpenLayers.Map('map', {
    	projection: "EPSG:900913",
    controls: []
    });

	
	positronLayer = new OpenLayers.Layer.XYZ(
		"CartoDB Positron",
		[
		  "https://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
		  "https://b.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
		  "https://c.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
		  "https://d.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png"
		],
		{
		  attribution: "Data by <a href='https://carto.com/attributions'>CARTO</a> (CC-BY-SA)",
		  isBaseLayer: true,
		}
	  );

	topoLayer = new OpenLayers.Layer.XYZ(
		"OpenTopoMap",
		[
		  "https://a.tile.opentopomap.org/${z}/${x}/${y}.png",
		  "https://b.tile.opentopomap.org/${z}/${x}/${y}.png",
		  "https://c.tile.opentopomap.org/${z}/${x}/${y}.png"
		],
		{
		  attribution: "Data by <a href='https://opentopomap.org/'>OpenTopoMap</a> (CC-BY-SA)",
		  isBaseLayer: true
		}
	  );
	  
	cyclOSMLayer = new OpenLayers.Layer.XYZ(
		"CyclOSM",
		[
		  "https://a.tile-cyclosm.openstreetmap.fr/cyclosm/${z}/${x}/${y}.png",
		  "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/${z}/${x}/${y}.png",
		  "https://c.tile-cyclosm.openstreetmap.fr/cyclosm/${z}/${x}/${y}.png"
		],
		{
		  attribution: "Data by <a href='https://www.cyclosm.org/'>CyclOSM</a>, (CC-BY-SA)",
		  isBaseLayer: true
		}
	  );

	humanOSMLayer = new OpenLayers.Layer.OSM(
		"HumanOSM",
		[
		  "https://tile-a.openstreetmap.fr/hot/${z}/${x}/${y}.png",
		  "https://tile-b.openstreetmap.fr/hot/${z}/${x}/${y}.png",
		  "https://tile-c.openstreetmap.fr/hot/${z}/${x}/${y}.png"
		],
		{
		  attribution: "Data by <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>, Humanitarian style",
		  isBaseLayer: true
		}
	  );

	
	osm = new OpenLayers.Layer.OSM({
  	attribution: "Data by <a href='https://www.openstreetmap.org/' target='_blank'>Open Street Map</a>,<a href='https://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>"
	} );
	

	map.addLayers([OSMgs, positronLayer, osm, cyclOSMLayer, humanOSMLayer, topoLayer]);
	map.setBaseLayer(OSMgs);

    
    var attr = new OpenLayers.Control.Attribution();
    map.addControl(attr);

    map.setCenter(new OpenLayers.LonLat( 4.829,45.759).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 15);
    
     var movingMap = window.setInterval(function() {
        map.moveByPx(0.1,0.5);
	}, 100);
 
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

var $j = jQuery.noConflict();
var $ = $j;

function handC() {
	(cycle = function() {
		$(".hand, .hand2").css({'background': '#83C849'});
		$(".hand, .hand2").animate({bottom: '-=5px'}, {queue:true, duration:100, easing:'easeOutBounce'}, 100);
		$(".hand, .hand2").animate({bottom: '+=5px'}, {queue:true, duration:100, easing:'easeOutBounce'}, 100);
	})();
    window.setTimeout(function() { handC(); }, 300, cycle);
    }

function bounceDiv() {
	$('.elefant, .shape, .osm, .gdal, .qst').effect("bounce", { times: 6 }, 500,function() {
		$('.elefant, .shape, .osm, .gdal, .qst').fadeOut();
		$('.inimess').fadeOut();
    });
}

$(function($) {

$('.map0,.map1, .map2, .map3, .map4, .map5').css({opacity:0});
	
	jQuery(function($){
	var focusColor = '#83c849';
	$('#form-container input:text[id], #form-container textarea[id]').bind('focus blur', function(e){
		$('label[for=' + this.id + ']').css({color: e.type === 'focus'? focusColor : ''});
		});
	});
 
$('#pano').hide();
   
target = $('.anim');
originalHeight = target.height();
target.height(0).css({
    display: 'block'
}).animate({
    height: originalHeight + 'px',
    marginTop: '-' + originalHeight / 2 + 'px'
}, 500, function() {

setTimeout(function() {
	$(".inimess").fadeIn(200);
	$(".elefant").fadeIn(200);
	$(".shape").fadeIn(200);
	$(".osm").fadeIn(200);
	$(".qst").fadeIn(400);
	bounceDiv();
	}, 500);
	
setTimeout(function() {
	$('.inimess1').fadeIn(1000);
	$('.inimess1').append('<div class="idea"></div>');
	$('.idea').fadeIn(1000);
	$(".anim").css({"background" : "url(../../images/pasaconh.png) no-repeat"});
  	
  	setTimeout(function() {
  	 	$('.inimess1').fadeOut(500);
		$('.idea').fadeOut(500);
		$(".anim").css({"background" : "url(../../images/pasacon.png) no-repeat"});
  	 	   }, 2200);
 
 	setTimeout(function() {
		$('.inimess3').fadeIn(1000);
		$('.inimess3').append('<div class="create"></div>');
		$('.create').fadeIn(1000);
	$(".anim").css({"background" : "url(../../images/pasaconh.png) no-repeat"});
	 	}, 3000);
	
 	setTimeout(function() {
		$('.inimess3').fadeOut(1000);
		$('.create').fadeOut(500);
		$(".anim").css({"background" : "url(../../images/pasacon.png) no-repeat"});
	 	}, 4400);
	 	
 	setTimeout(function() {
		$('.inimess4').fadeIn(1000);
		$('.inimess4').append('<div class="publi"></div>');
		$('.publi').fadeIn(1000);
		$(".anim").css({"background" : "url(../../images/pasaconh.png) no-repeat"});
	 	}, 5200);
	 	 	
	setTimeout(function() {
		$('.inimess4').fadeOut(1000);
		$('.publi').fadeOut(1000);
		$(".anim").css({"background" : "url(../../images/pasacon.png) no-repeat"});
        $('.mmlogo').fadeOut(500);							  	 	
	 	}, 6800);
	 	
}, 4400);
		
setTimeout(function() {
		handC();
	}, 10800);

setTimeout(function() {

 $(".map0").animate({opacity:1, marginLeft:'74%', marginTop:'-200px', zIndex:'1'}, 1000, function() {
 map.setBaseLayer(OSMgs);
 $(".map1").animate({opacity:1, marginLeft: '67%', marginTop:'-200px', zIndex:'1'}, 2000, function() {
 map.setBaseLayer(cyclOSMLayer);
 $('.endmess').fadeIn(1000);	
 $(".map2").animate({opacity:1, marginLeft: '74%', marginTop:'-110px', zIndex:'1'}, 2000, function() {
 	map.setBaseLayer(osm);
 	$(".map3").animate({opacity:1, marginLeft: '67%', marginTop:'-110px', zIndex:'1'}, 2000, function() {
 		map.setBaseLayer(humanOSMLayer);  
 		$(".anim").css({"background" : "url(../../images/pasaconh.png) no-repeat"});
 		$('.endmess').fadeOut(1000);	 
 		$(".map4").animate({opacity:1, marginLeft: '74%', marginTop:'-20px', zIndex:'1'}, 2000, function() {
		map.setBaseLayer(positronLayer);
		$(".map5").animate({opacity:1, marginLeft: '67%', marginTop:'-16px', zIndex:'1'}, 2000, function() {
		$(".hand, .hand2").fadeOut(2000);
		map.setBaseLayer(topoLayer);
		$(".map5").toggleClass("rt");
		$(".anim").css({"background" : "transparent"});
		$('.anim').append('<div class="btmblk"><h1 class="tour"><a href="../en/Tour">Take a tour.</a></h1></div>');
		});
		});
	 });
	});
   });
  });
}, 11000);

});


});


