import React, { Component } from 'react';

let KEY = 'AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc'

// function vincenty(latitude1, longitude1, alpha1, s) {
// 	const doRad = function (x) { return x / 180 * Math.PI };
// 	const radDo = function (x) { return x * 180 / Math.PI };
// 	const a = 6378137.0;
// 	const f = 1 / 298.257222101;
// 	const b = (1 - f) * a; // 6356752.314 
// 	const lat1 = doRad(latitude1);
// 	const lng1 = doRad(longitude1);

// 	const U1 = Math.atan((1 - f) * Math.tan(lat1));
// 	const sigma1 = Math.atan2(Math.tan(U1), Math.cos(alpha1));
// 	const alpha = Math.asin(Math.cos(U1) * Math.sin(alpha1));
// 	const a2 = Math.pow(a, 2);
// 	const b2 = Math.pow(b, 2);
// 	const u2 = Math.pow(Math.cos(alpha), 2) * (a2 - b2) / b2;
// 	const A = 1 + (u2 / 16384) * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
// 	const B = (u2 / 1024) * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
// 	const sigma0 = s / b / A;
// 	let sigma = sigma0;
// 	let sm2;
// 	do {
// 		sm2 = 2 * sigma1 + sigma;
// 		const x = Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(sm2), 2)) - B / 6 * Math.cos(sm2) * (-3 + 4 * Math.pow(Math.sin(sm2), 2)) * (-3 + 4 * Math.pow(Math.cos(sm2), 2));
// 		const dSigma = B * Math.sin(sigma) * (Math.cos(sm2) + B / 4 * x);
// 		sigma = s / b / A + dSigma;
// 	} while (Math.abs(sigma - sigma0) > 1e-9);

// 	const y = Math.sin(U1) * Math.cos(sigma) + Math.cos(U1) * Math.sin(sigma) * Math.cos(alpha1);
// 	const x = (1 - f) * Math.pow(Math.pow(Math.sin(alpha), 2) + Math.pow(Math.sin(U1) * Math.sin(sigma) - Math.cos(U1) * Math.cos(sigma) * Math.cos(alpha1), 2), 1 / 2);
// 	const lambda = Math.atan2(Math.sin(sigma) * Math.sin(alpha1), Math.cos(U1) * Math.cos(sigma) - Math.sin(U1) * Math.sin(sigma) * Math.cos(alpha1));
// 	const C = (f / 16) * Math.pow(Math.cos(alpha), 2) * (4 + f * (4 - 3 * Math.pow(Math.cos(alpha), 2)));
// 	const z = Math.cos(sm2) + C * Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(sm2), 2));
// 	const lng = lambda - (1 - C) * f * Math.sin(alpha) * (sigma + C * Math.sin(sigma) * z);
// 	const lat2 = Math.atan2(y, x);
// 	const lng2 = lng + lng1;
// 	return [radDo(lat2), radDo(lng2)];
// }

function vincenty(lat1, lng1, deg1, s) {
	/*
			引数
			p1    : 中心となる点（点１）の緯度・経度（google.maps.LatLngクラス）
			deg1  : 求める点の方角（真北からの時計回りの角度。北:0、東:90、南：180、西：270）
			s     : 点１からの距離（ｍ）
	*/
	var p2                         //求める点（点２）の緯度・経度（google.maps.LatLngクラス）
	var a = 6378137.0;             //長半径（赤道半径）
	var f = 1.0 / 298.257223563;   //扁平率（WGS84）
	var b = a * (1 - f);           //短半径（極半径）
	var phi1, phi2;                 //点１、点２の緯度
	var L1, L2;                     //点１、点２の経度
	var L;                         //点１、点２の経度差
	var alpha1, alpha2;
	var alpha;
	var U1, U2;
	var lambda
	var sigma;
	var sigma1, formersigma;
	var sigmam, deltasigma;
	var epsilon = 1.0e-12;         //計算精度（sigmaの許容誤差）
	var sinalpha, cosalpha2;
	var u2, A, B, C;
	var cnt = 0;
	const doRad = function (x) { return x / 180 * Math.PI };
	const radDo = function (x) { return x * 180 / Math.PI };

	phi1 = doRad(lat1);
	L1 = doRad(lng1);
	alpha1 = doRad(deg1);

	U1 = Math.atan((1 - f) * Math.tan(phi1));
	sigma1 = Math.atan2(Math.tan(U1), Math.cos(alpha1));
	sinalpha = Math.cos(U1) * Math.sin(alpha1);
	cosalpha2 = 1 - Math.pow(sinalpha, 2);
	u2 = cosalpha2 * ((Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2));
	A = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
	B = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));

	sigma = s / (b * A);
	do {
		sigmam = (2 * sigma1 + sigma) / 2;
		deltasigma = B * Math.sin(sigma)
			* (Math.cos(2 * sigmam)
				+ 1 / 4 * B * (Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(2 * sigmam), 2))
					- 1 / 6 * B * Math.cos(2 * sigmam) * (-3 + 4 * Math.pow(Math.sin(sigma), 2)) * (-3 + 4 * Math.pow(Math.cos(2 * sigmam), 2))));
		formersigma = sigma;
		sigma = s / (b * A) + deltasigma;
		cnt++;
		if (cnt > 100) {
			alert("error");
			return null;
		}
	} while (Math.abs(sigma - formersigma) > epsilon);

	phi2 = Math.atan2((Math.sin(U1) * Math.cos(sigma) + Math.cos(U1) * Math.sin(sigma) * Math.cos(alpha1))
		, ((1 - f) * Math.sqrt(Math.pow(sinalpha, 2) + Math.pow((Math.sin(U1) * Math.sin(sigma) - Math.cos(U1) * Math.cos(sigma) * Math.cos(alpha1)), 2))));
	lambda = Math.atan2(Math.sin(sigma) * Math.sin(alpha1), (Math.cos(U1) * Math.cos(sigma) - Math.sin(U1) * Math.sin(sigma) * Math.cos(alpha1)));
	C = f / 16 * cosalpha2 * (4 + f * (4 - 3 * cosalpha2));
	L = lambda - (1 - C) * f * sinalpha * (sigma + C * Math.sin(sigma) * (Math.cos(2 * sigmam) + C * Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(2 * sigmam), 2))));
	L2 = L + L1;
	alpha2 = Math.atan(sinalpha / (-1 * Math.sin(U1) * Math.sin(sigma) + Math.cos(U1) * Math.cos(sigma) * Math.cos(alpha1)));
	// p2 = new google.maps.LatLng(radDo(phi2), radDo(L2));
	p2 = [radDo(phi2), radDo(L2)];
	return p2;
}

// function vincentyInv(latitude1, longitude1, latitude2, longitude2) {
// 	const doRad = function (x) { return x / 180 * Math.PI };
// 	const radDo = function (x) { return x * 180 / Math.PI };
// 	const a = 6378137.0;
// 	const f = 1 / 298.257222101;
// 	const b = (1 - f) * a; // 6356752.314 
// 	const lat1 = doRad(latitude1);
// 	const lat2 = doRad(latitude2);
// 	const lng1 = doRad(longitude1);
// 	const lng2 = doRad(longitude2);

// 	const U1 = Math.atan((1 - f) * Math.tan(lat1));
// 	const U2 = Math.atan((1 - f) * Math.tan(lat2));
// 	const lng = lng2 - lng1;
// 	const lambda0 = lng;
// 	let lambda = lambda0;
// 	let sigma, alpha, sm2;
// 	let count = 0;
// 	do {
// 		const sinSigma = Math.pow(Math.pow(Math.cos(U2) * Math.sin(lambda), 2) + Math.pow(Math.cos(U1) * Math.sin(U2) - Math.sin(U1) * Math.cos(U2) * Math.cos(lambda), 2), 1 / 2);
// 		const cosSigma = Math.sin(U1) * Math.sin(U2) + Math.cos(U1) * Math.cos(U2) * Math.cos(lambda);
// 		const sinAlpha = Math.cos(U1) * Math.cos(U2) * Math.sin(lambda) / sinSigma;
// 		const cos2alpha = 1 - Math.pow(sinAlpha, 2);
// 		let cosSm2 = cosSigma - 2 * Math.sin(U1) * Math.sin(U2) / cos2alpha;
// 		if (isNaN(cosSm2)) cosSm2 = 0;  // equatorial line: cos2alpha=0 (§6)
// 		const C = f / 16 * cos2alpha * (4 + f * (4 - 3 * cos2alpha));
// 		lambda = lng + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cosSm2 + C * cosSigma * (-1 + 2 * Math.pow(cosSm2, 2))));
// 		sigma = Math.atan2(sinSigma, cosSigma);
// 		alpha = Math.asin(sinAlpha);
// 		sm2 = Math.acos(cosSm2);
// 		if (count++ > 10) { break; }
// 	} while (Math.abs(lambda - lambda0) > 1e-12);

// 	const a2 = Math.pow(a, 2);
// 	const b2 = Math.pow(b, 2);
// 	const u2 = Math.pow(Math.cos(alpha), 2) * (a2 - b2) / b2;
// 	const A = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
// 	const B = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
// 	const x = Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(sm2), 2)) - B / 6 * Math.cos(sm2) * (-3 + 4 * Math.pow(Math.sin(sm2), 2)) * (-3 + 4 * Math.pow(Math.cos(sm2), 2));
// 	const dSigma = B * Math.sin(sigma) * (Math.cos(sm2) + B / 4 * x);
// 	const s = b * A * (sigma - dSigma);
// 	let alpha1 = Math.atan2(Math.cos(U2) * Math.sin(lambda), Math.cos(U1) * Math.sin(U2) - Math.sin(U1) * Math.cos(U2) * Math.cos(lambda));
// 	return [radDo(alpha1), s];
// }

async function vincentyInv(latitude1, longitude1, latitude2, longitude2) {
	const uri = "http://vldb.gsi.go.jp/sokuchi/surveycalc/surveycalc/bl2st_calc.pl?outputType=json&ellipsoid=bessel";
	const query = "&latitude1=" + latitude1 + "&longitude1=" + longitude1 + "&latitude2=" + latitude2 + "&longitude2=" + longitude2;
	const url = uri + query;

	const res = await fetch(url);
	const data = await res.json();
	return [data.OutputData.azimuth1, data.OutputData.geoLength];
	// return vincenty(latitude1, longitude1, data.OutputData.azimuth1, data.OutputData.geoLength);
}

async function split(startLat, startLng, endLat, endLng) {
	const [alpha0, s] = await vincentyInv(startLat, startLng, endLat, endLng);
	// console.log(alpha, s);
	let points = [{ lat: startLat, lng: startLng, heading: alpha0 }];
	let { lat, lng, heading } = points[0];
	console.log(lat, lng, heading);
	const L = 10;
	for (let i = 0; i * L < s; i++) {
		const [nxtLat, nxtLng] = vincenty(lat, lng, heading, L);
		points.push({ lat: nxtLat, lng: nxtLng, heading: heading });
		lat = nxtLat;
		lng = nxtLng;
		console.log(lat, lng, heading);
	}
	return points;
}

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			from: "",
			to: "",
			imgs_url: [],
		};
	}

	consClick = () => {
		const { imgs_url } = this.state;
		console.log(imgs_url);
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			from: "",
			to: ""
		});
	}

	viewImgs = (event) => {
		event.preventDefault();
		let uri = "https://maps.googleapis.com/maps/api/directions/json?key=" + KEY;
		let query = "&origin=" + this.state.from + "&destination=" + this.state.to;
		let url = uri + query;

		fetch(url)
			.then(res => {
				return res.json();
			})
			.then(async (res) => {
				console.log(res);
				let steps = res.routes[0].legs[0].steps;

				let imgs_url_arr = [];

				for (let i = 0; i < steps.length; i++) {
					let startLat = steps[i].start_location.lat
					let startLng = steps[i].start_location.lng
					let endLat = steps[i].end_location.lat
					let endLng = steps[i].end_location.lng
					let locs = await split(startLat, startLng, endLat, endLng);
					for (let j = 0; j < locs.length; j++) {
						let loc = locs[j].lat + ',' + locs[j].lng;
						let heading = locs[j].heading;
						let img_url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' + heading + '&pitch=10&key=' + KEY;
						// console.log(img_url);
						imgs_url_arr.push(img_url);
					}
				}

				this.setState({
					imgs_url: imgs_url_arr
				});

			});

		/*
		let lat = element.start_location.lat
		let lng = element.start_location.lng
		let lat = 35.6829696
		let lng = 139.7666604


		let loc = lat + ',' + lng
		let heading = '0'

		//console.log('緯度:' + lat + ' 経度:' + lng +  ' 方位:' + heading );
		let url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' +  heading + '&pitch=10&key=' + KEY 

		this.setState({
			imgs_url : [...imgs_url , url ]
		});

		console.log(imgs_url)
		*/
	}


	render() {
		const { todos, imgs_url } = this.state;
		return (<div>
			<h1>道すじ見せ太郎</h1>
			<p>From</p>
			<input type="text" name="from" onChange={this.handleChange} value={this.state.from} />
			<p>To</p>
			<input type="text" name="to" onChange={this.handleChange} value={this.state.to} />
			<button onClick={this.viewImgs} >view</button>

			<br />

			{
				imgs_url.map((url, index) =>
					<div>
						<img src={url}></img>
					</div>
				)
			}


			{/* <button onClick={this.consClick} >cons</button> */}

		</div >
		);
	}
}
