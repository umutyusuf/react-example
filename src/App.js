import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewForm from './forms/ReviewForm.js'
import NavbarComponent from './components/Navbar.js'
import RegisterModal from './forms/RegisterModal.js'

class App extends Component {
  render() {
    return (
    	<div>
    		<NavbarComponent openRegister={this.openRegister.bind(this)}/>
        	<ReviewForm/>
      		<RegisterModal  
      			isOpen={this.state.openRegister}
      			closeModal={this.closeModal}/>
        </div>
    );
  }
  constructor(props) {
  	super(props);
  	this.closeModal = this.closeModal.bind(this);
  	this.state = {
  		openRegister: false,
  	}
  }

  openRegister() {
  	this.setState({
		openRegister: true,
  	});
  }

  closeModal() {
  	this.setState({
		openRegister: false,
  	});	
  }
}

export default App;
