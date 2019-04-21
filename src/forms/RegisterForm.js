import React from 'react';
import { Button, Label, Input, FormFeedback, FormGroup, Form } from 'reactstrap';
import {validateEmail} from './../util/ValidationUtils.js';

export default class RegisterForm extends React.Component {
  
  render() {
    return (
    	<Form className="form">
            <FormGroup>
	            <Label for="register-email">E-posta</Label>
	            <Input  name="register-email" type="email" placeholder="E-posta Adresiniz"
	                    invalid={this.state.formSubmitted &&!this.state.emailValid}
	                    onChange={this.watchEmail.bind(this)}/>
	            <FormFeedback invalid={this.state.formSubmitted &&!this.state.emailValid}>Geçerli bir email adresi giriniz</FormFeedback>
            </FormGroup>

            <FormGroup>
	            <Label for="register-password">Parola</Label>
	            <Input  name="register-password" type="password" placeholder="Parolanız"
	                    invalid={this.state.formSubmitted && !this.state.passwordValid}
	                    onChange={this.watchPassword.bind(this)}/>
	            <FormFeedback invalid={this.state.formSubmitted && !this.state.passwordValid}>
	            Şifreniz en az {this.minPasswordLength} karaker uzunluğunda olmalıdır.
	            </FormFeedback>
	        </FormGroup>

	        <FormGroup>
	            <Label for="register-password-again">Parolanızı Onaylaylayın</Label>
	            <Input  name="register-password-again" type="password" placeholder="Parola Onayla"
	                    invalid={this.state.formSubmitted && !this.state.passwordMatch && this.state.passwordValid}
	                    onChange={this.watchPasswordAgain.bind(this)}/>
	            <FormFeedback invalid={this.state.formSubmitted && !this.state.passwordMatch}>Şifreniz eşleşmiyor</FormFeedback>
	        </FormGroup>

	        <FormGroup>
		    	<Button color="primary" onClick={this.register.bind(this)}>Üye Ol!</Button>
			</FormGroup>
    	</Form>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      formSubmitted: false,
      email: '',
      password: '',
      formValid: false,
    }
    this.minPasswordLength = 6;
  }

  validateForm() {
    const formValid = this.state.emailValid 
                      && this.state.passwordValid
                      && this.state.passwordMatch;
    this.setState({
      formValid: formValid,
    });
    return formValid;
  }

  register(e) {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    });
    if (!this.validateForm()) {
      return;
    }

  }

  watchEmail(input) {
    const email = input.target.value;
    this.setState({
        emailValid: validateEmail(email, true),
        email: email,
    });
  }


  watchPassword(input) {
    const password = input.target.value;
    this.setState({
      passwordValid: password.length >= this.minPasswordLength ,
      password: password,
    });
  }

  watchPasswordAgain(input) {
    const passwordAgain = input.target.value;
    this.setState({
      passwordMatch: passwordAgain === this.state.password,
    });
  }

  closeModal() {
    this.setState({responseValid: false,});
  }
}