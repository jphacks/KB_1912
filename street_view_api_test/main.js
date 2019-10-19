var KEY = 'AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc'
$(function(){
	$('#btn').on('click',function(){
		let latitude = '34'
		let longitude = '135.988354'
		let loc = latitude + ',' + longitude
		let heading = '0'

		console.log('緯度:' + latitude + ' 経度:' + longitude +  ' 方位:' + heading );

		var url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' +  heading + '&pitch=10&key=' + KEY
		var img=new Image();
		img.onload=function(e){
			var width= img.width;
			var height= img.height;
			var cnvsH = 400;
			var cnvsW = parseInt(width * cnvsH / height);
			var canvas = document.querySelector('#canvas');
			canvas.setAttribute('width', cnvsW);
			canvas.setAttribute('height', cnvsH);
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, cnvsW, cnvsH);
		}
		img.src=url;
	});
});
