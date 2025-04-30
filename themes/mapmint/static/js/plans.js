var map;
var lonlat;
var  OSMgs;
var $j = jQuery.noConflict();
var $ = $j;

$(function($) {
    console.log( "ready!" );
    $(".span4").each(function(){
      console.log($(this));
        $(this).removeClass("span4").addClass("col-md-4");
	});
	$(".span8").each(function(){
	  $(this).removeClass("span8").addClass("col-md-8");
	  });
	  $(".span6").each(function(){
	    $(this).removeClass("span6").addClass("col-md-6");
	    });
         if (!OpenLayers.CANVAS_SUPPORTED) {
                var unsupported = OpenLayers.Util.getElement('unsupported');
                unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
            }

            OSMgs = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {
                opacity:1,
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

    map = new OpenLayers.Map('map4', {
        projection: "EPSG:900913",
    controls: []
    });


    map.addLayers([OSMgs]);

    var attr = new OpenLayers.Control.Attribution();
    map.addControl(attr);

    map.setCenter(new OpenLayers.LonLat(2.351828,48.856578).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 15);

     var movingMap = window.setInterval(function() {
        map.moveByPx(0.1,0.5);
        }, 100);





$('.ce').click(function(){
 $('body').animate({
         scrollTop: $(".os").offset().top
     }, 2000);
});

$('.wyg').click(function(){
 $('body').animate({
         scrollTop: $(".det").offset().top
     }, 1500);
});

});