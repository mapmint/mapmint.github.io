var map;
var lonlat;
var gsat, gmap, gphy, ghyb, streetlayer;
var baseOSM, osm, OSMgs;
var cycle;
var stamenLayer;
    
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

	baseOSM = new OpenLayers.Layer.TMS("MapQuest", "http://otile1.mqcdn.com/tiles/1.0.0/osm/",	{
  		type: 'png', 
  		getURL: osm_getTileURL,
  		displayOutsideMaxExtent: true, 
  		isBaseLayer: true,
  		attribution: "Data by <a href='http://www.mapquest.com/'  target='_blank'>MapQuest</a>, CC-BY-SA <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a>",
  		transitionEffect: "resize"
 	});
 
    stamenLayer = new OpenLayers.Layer.Stamen("watercolor");
    
    gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
    );
    gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20}
    );
    ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    );
    gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );

	osm = new OpenLayers.Layer.OSM({
  	attribution: "Data by <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a>,<a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>"
	} );

    map.addLayers([OSMgs/*,baseOSM,gmap,gphy, gsat, ghyb*/,osm, stamenLayer]);
    
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
 map.setBaseLayer(osm);
 $(".map1").animate({opacity:1, marginLeft: '67%', marginTop:'-200px', zIndex:'1'}, 2000, function() {
 map.setBaseLayer(baseOSM);
 $('.endmess').fadeIn(1000);	
 $(".map2").animate({opacity:1, marginLeft: '74%', marginTop:'-110px', zIndex:'1'}, 2000, function() {
 	map.setBaseLayer(gmap);
 	$(".map3").animate({opacity:1, marginLeft: '67%', marginTop:'-110px', zIndex:'1'}, 2000, function() {
 		map.setBaseLayer(gphy);  
 		$(".anim").css({"background" : "url(assets/images/pasaconh.png) no-repeat"});
 		$('.endmess').fadeOut(1000);	 
 		$(".map4").animate({opacity:1, marginLeft: '74%', marginTop:'-20px', zIndex:'1'}, 2000, function() {
		map.setBaseLayer(stamenLayer);
		$(".map5").animate({opacity:1, marginLeft: '67%', marginTop:'-16px', zIndex:'1'}, 2000, function() {
		$(".hand, .hand2").fadeOut(2000);
		map.setBaseLayer(gsat);
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


