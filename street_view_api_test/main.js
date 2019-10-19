var KEY = 'AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc'
var steps

$.getJSON("test2.json", function(json) {
	console.log(json.routes[0].legs[0].steps) // this will show the info it in firebug console
	steps = json.routes[0].legs[0].steps 

});

$(function(){
	$('#btn').on('click',function(){

		let bef_lat = null , bef_lng = null;

		steps.forEach(function(element) {
			let lat = element.start_location.lat
			let lng = element.start_location.lng

			let loc = lat + ',' + lng
			let heading = '0'

			console.log('緯度:' + lat + ' 経度:' + lng +  ' 方位:' + heading );
			var url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' +  heading + '&pitch=10&key=' + KEY
			var img=new Image();
			img.onload=function(e){
				var width= img.width;
				var height= img.height;
				var cnvsH = 400;
				var cnvsW = parseInt(width * cnvsH / height);
				var canvas = document.createElement('canvas');
				canvas.setAttribute('width', cnvsW);
				canvas.setAttribute('height', cnvsH);
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, cnvsW, cnvsH);
				document.body.appendChild(canvas);
			}
			img.src=url;

			bef_lat = lat
			bef_lng = lng

		});

	});
});
