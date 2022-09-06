import React from "react";
import './App.css';
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			DataisLoaded: false
		};
	}

	componentDidMount() {
		fetch(
      'https://juvigo.es/api/give-me-a-test-booking',{
        method: 'POST', 
        body: JSON.stringify({"bookingID": 12435678}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
			.then((res) => res.json())
			.then((json) => {
				this.setState({
          items:Object.entries(json.data).join(' ; ').replace(/,/g, " : ").replace(/_/g, " "),
					DataisLoaded: true
				})
        ;
			})
	}

	render() {
		const { DataisLoaded, items } = this.state;
    
		if (!DataisLoaded) return <div>
			<h1> Please wait some time.... </h1> </div> ;

		return (
		<div className = "box">
      <div className = "innerBox">
        <h1 className = "title">BOOKING INFORMATION</h1>
        <ul className = "list">
        {
          items.split(' ; ').map((item, i) =>(   
          <li className= "listItem" key={i}>{item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
         
          ))
        }
        </ul>
        <button>Edit</button>
      </div>
		</div>
	);
}
}

export default App;
