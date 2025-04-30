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

 map = new OpenLayers.Map('map2', {
    	projection: "EPSG:900913",
    controls: []
    });



baseOSM = new OpenLayers.Layer.TMS("MapQuest", "http://otile1.mqcdn.com/tiles/1.0.0/osm/",	{
  type: 'png', 
  getURL: osm_getTileURL,
  displayOutsideMaxExtent: true, 
  isBaseLayer: true,
  attribution: "Data by <a href='http://www.mapquest.com/'  target='_blank'>MapQuest</a>, <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a><img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
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



    map.addLayers([OSMgs,baseOSM,gmap,gphy, gsat, ghyb,osm, stamenLayer]);
    
    var attr = new OpenLayers.Control.Attribution();
    map.addControl(attr);

    map.setCenter(new OpenLayers.LonLat(-122.50,37.779276).transform(
        new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()
    ), 15);
    
     var movingMap = window.setInterval(function() {
        map.moveByPx(1,0);

      },
      30
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


   
var $j = jQuery.noConflict();
var $ = $j;
$(function($) {
    init();
 
var what = ".tagcloud a"; 
headline_interval = setInterval('decorate_links(0.8,0.2,"#83c849")', 850); headline_interval = setInterval('decorate_links(0.6,0.1,"#83c849")', 450); 
headline_count = $(what).size();


setInterval(function() {
    $('.b').animate( {borderLeftColor: '#d9d8d8' }, 500)
    .animate( {borderLeftColor: '#83c849'}, 500); 
    }, 1000);
    
setInterval(function() {
    $('.c').animate( {borderTopColor: '#d9d8d8' }, 500)
    .animate( {borderTopColor: '#83c849'}, 500); 
    }, 1000);

setInterval(function() {
    $('#warped span').animate( {color: '#cbcbcb' }, 1000)
    .animate( {color: '#83c849'}, 1000); 
    }, 2000);
    
    
$(function () {
    $("img.zoo").animate({
            "width": 450,
            "height": 200,
            "left": "35%",
            "top": 325
     }, 1000 );
});

$(".sun").fadeIn(200);

	
target = $('.anim2');
originalHeight = target.height();
target.height(0).css({
    display: 'block'
}).animate({
    height: originalHeight + 'px',
    marginTop: '-' + originalHeight / 2 + 'px'
}, 2000, function() {

 
    setTimeout(function() {
        $(function () {
        $(".inimess2").fadeIn(1000);	
    
        
    setTimeout(doDisplay, 1500 );
    
    setTimeout(doDisplay1, 3000 );
    
    setTimeout(doDisplay2, 4500 );
    
    setTimeout(doDisplay3, 6000 );
    
    setTimeout(doDisplay4, 6500 );	
    
    setTimeout(doDisplay5, 7000 );
    
        }, 4000 );
        
        
        });
    

	
	});		

});



$('.gdgreen').click(function(){
 $('body').animate({
         scrollTop: $(".pyd").offset().top
     }, 2000); 
});
	
$('.msgreen').click(function() {
 $('body').animate({
         scrollTop: $(".syp").offset().top
     }, 2000);  
});


$('.olgreen').click(function() {
 $(' body').animate({
         scrollTop: $(".cwa").offset().top
     }, 2000);  
});

$('.jqgreen').click(function() {
 $(' body').animate({
         scrollTop: $(".psm").offset().top
     }, 2000);
});


function decorate_links(start,end,color) { var a = Math.floor(Math.random() * headline_count); $(".tagcloud a:eq(" + a + ")").fadeTo('slow', start, function () { $(this).css('color', color) }); $(".tagcloud a:eq(" + a + ")").fadeTo('slow', end); 
}

function goTop() {
	$('html, body').animate({
         scrollTop: $("header").offset().top
     }, 2000);  

}

function doDisplay() {
			
			$('.anim2').append('<div id="cog"></div>');	
			$(".gddesc").fadeIn(1000);
			$(".sun").fadeOut(1000);
			$(".wploud").fadeIn(1000);	

}

function doDisplay1() {
			$('.anim2').append('<div id="cog1"></div>');
			$(".msdesc").fadeIn(1000);			
			$(".ogcloud").fadeIn(1000);	
			}


function doDisplay2() {

		$('.anim2').append('<div id="cog2"></div>');
			$(".oldesc").show();
					
	}
	
function doDisplay3(){
	$('.anim2').append('<div id="cog3"></div>');
			$(".jqdesc").fadeIn(1000);	
}
	
function doDisplay4() {
	$(".oldesc").show();

(function doDisplay5($) {
   
        $("#scroller").fadeIn(1000);
        $("#scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
   
})(jQuery);



}
