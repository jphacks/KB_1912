var KEY = 'AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc'
var steps

$.getJSON("test2.json", function(json) {
	console.log(json.routes[0].legs[0].steps) // this will show the info it in firebug console
	steps = json.routes[0].legs[0].steps 

});

$(function(){
	$('#btn').on('click',function(){


		/*
		//インスタンスの生成
		gifAnimation = new GIFEncoder();
		//コマ毎の遅延時間（ミリ秒）
		gifAnimation.setDelay(0);
		//GIFアニメーションの生成開始
		gifAnimation.start();
		*/

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

				//gifAnimation.addFrame( canvas );
			}
			img.src=url;

			bef_lat = lat
			bef_lng = lng

		});

		/*
		gifAnimation.finish();
		//バイナリデータの編集
		var byteString = gifAnimation.stream().getData() ;
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		// Blobオブジェクトの生成
		var blob = new Blob( [ab], {type: "image/gif" });
		//a要素の生成
		var a = document.createElement("a");
		//BlobURLを取得しa要素のsrcへ与える
		a.href = window.URL.createObjectURL( blob );
		//PNGファイル名の命名
		a.download = "animation.gif";
		a.innerHTML = "gifアニメーション";
		//body要素にa要素を追加
		document.getElementsByTagName( "body" )[0].appendChild(a);
		*/

	});
});
