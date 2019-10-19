import React, { Component } from 'react';

var KEY = 'AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			name: '' ,
			imgs_url : []
		};
	}

	onInput = (e) => {
		this.setState({
			name: e.target.value
		});
	}

	addTodo = () => {
		const { todos, name } = this.state;
		this.setState({
			todos: [...todos, name]
		});
	}

	consClick = () => {
		const { imgs_url } = this.state;
		console.log(imgs_url)
	}

	viewImgs = () =>{
		const { imgs_url } = this.state;

		let uri = "https://maps.googleapis.com/maps/api/directions/json?key=" + KEY;
    let query = "&origin=Sannomiya St&destination=KIITO";
    let url = uri + query;

    fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
      var steps = res.routes[0].legs[0].steps;

			var imgs_url_arr = [];

			for( let i = 0 ; i < steps.length ; i++ ){
				
				let lat = steps[i].start_location.lat
				let lng = steps[i].start_location.lng
				let loc = lat + ',' + lng
				let heading = '0'
				let img_url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' +  heading + '&pitch=10&key=' + KEY 
				console.log(img_url)
				imgs_url_arr.push(  img_url )

			}

			this.setState({
					imgs_url : imgs_url_arr 
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
		var url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + loc + '&fov=120&heading=' +  heading + '&pitch=10&key=' + KEY 

		this.setState({
			imgs_url : [...imgs_url , url ]
		});


		console.log(imgs_url)

		*/
	}

	removeTodo = (index) => {
		const { todos, name } = this.state;
		this.setState({
			todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
		});
	}

	render() {
		const { todos , imgs_url} = this.state;
		return (<div>
			<input type="text" onInput={this.onInput} />
			<button onClick={this.addTodo} >登録</button>
			<ul>
			{todos.map((todo, index) => <li key={index}>
				{todo}
				<button onClick={() => { this.removeTodo(index) }}>削除</button>
				</li>)}
			</ul>


			<button onClick={this.viewImgs} >view</button>

			<br/>

			{imgs_url.map((url, index) => 
				<div>
				<img src={url}></img> 
				</div>
			)}


			<button onClick={this.consClick} >cons</button>

			</div>
		);
	}
}
