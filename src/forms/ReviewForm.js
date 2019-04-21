import React from 'react';
import { Button, Label, Input, FormFeedback, Form, Container, Alert, FormGroup } from 'reactstrap';
import './../assets/css/review.css'
import {post} from './../util/ApiUtils.js'
import {validateEmail} from './../util/ValidationUtils.js'
import RegisterModal from './../forms/RegisterModal.js'


export default class ReviewForm extends React.Component {
  render() {
    return (
      <Container className="ReviewFormContainer">
        <h2> Şikayet Yaz</h2>
        <Form className="form">
          <FormGroup>
            <Label for="reviewContent">Şikayetiniz</Label>
            <Input  type="textarea" 
                    rows={6}
                    name="reviewContent" id="reviewContent"
                    invalid={!this.state.reviewContentValid && this.state.formSubmitted} 
                    onChange={this.watchReviewContent.bind(this)}
                    placeholder="Şikayetiniz. Bu alana ilgili alışveriş sürecinizde yaşadığınız sorunu yazınız"/>
            <FormFeedback invalid={this.state.formSubmitted && !this.state.reviewContentValid}>
              Şikayet içeriğiniz en az {this.minReviewCharCount} olmalıdır.
            </FormFeedback>
            <label className="Counter"> {this.state.reviewcontentCharLeft} </label>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Butik İsmi</Label>
            <Input  invalid={this.state.formSubmitted && !this.state.merchantNameValid}
                    name="merchantName" 
                    type="text"
                    onChange={this.watchMerchant.bind(this)}
                    placeholder="Butik İsmi"
                    required/>
            <FormFeedback invalid={this.state.formSubmitted && !this.state.merchantNameValid} >
              Geçerli bir butik ismi giriniz adresi giriniz
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">E-posta Adresiniz</Label>
            <Input  invalid={!this.state.emailValid && this.state.formSubmitted} 
                    name="exampleEmail" 
                    onChange={this.watchEmail.bind(this)} 
                    placeholder="Emailiniz"
                    type="email"/>
            <FormFeedback invalid={!this.state.emailValid}>Geçerli bir E-posta adresi giriniz</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={this.handleSubmitClick.bind(this)}>Şikayeti Oluştur</Button>
          </FormGroup>
          <Alert color="primary" isOpen={this.state.pendingRequest}>
              Şikayetiniz oluşturuluyor
            </Alert>
            <Alert color="secondary" isOpen={this.state.requestFailed}>
              Bir hata oluştur. {this.state.requestErrorMessage}
            </Alert>

          <RegisterModal  isOpen={this.state.responseValid} 
                          closeModal={this.closeModal}
                          additionalMessage={"Şimdi üye olarak şikayetinizi takip edebilirsiniz."} />
        </Form>
      </Container>
    );
  }

  constructor(props) {
    super(props); 
    this.closeModal = this.closeModal.bind(this);
    this.minReviewCharCount = 150;
    this.maxReviewCharCount = 2500;
    this.state = {
        formSubmitted: false,
        fomValid: false,
        emailValid: true,
        reviewContentValid: false,
        merchantNameValid: false,
        email: '',
        merchantName: '',
        reviewContent: '',
        reviewcontentCharLeft: this.maxReviewCharCount,
        pendingRequest: false,
        requestFailed: false,
        requestErrorMessage: '',
        responseValid: false,
      };
  }

  watchEmail(input) {
    const email = input.target.value;
    this.setState({
          emailValid: validateEmail(email),
          email: email,
        });
  }

  watchMerchant(input) {
    const merchantName = input.target.value;
      this.setState({
        merchantNameValid: !!merchantName.trim(),
        merchantName: merchantName,
      })
  }

  watchReviewContent(input) {
    let reviewContent = input.target.value.trim();
    if (reviewContent.length >= this.maxReviewCharCount) {
      reviewContent = reviewContent.substring(0, this.maxReviewCharCount);
      input.target.value = reviewContent;
    }
      this.setState({
        reviewContentValid: reviewContent && reviewContent.length > this.minReviewCharCount ,
        reviewContent: reviewContent,
        reviewcontentCharLeft: this.maxReviewCharCount - reviewContent.length,
      })
  }

  validateForm() {
    const formValid = this.state.emailValid
                      && this.state.reviewContentValid
                      && this.state.merchantNameValid;
    this.setState({
        formValid: formValid,
    });
    return formValid;
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    });
    
    
    if (this.validateForm()) {
     this.setState({
          pendingRequest: true,
      });

      post("review?email=" + this.state.email, {
        storeName: this.state.merchantName,
        content: this.state.reviewContent
      }, (result) => {
        this.setState({
          pendingRequest: false,
          responseValid: true,
          formSubmitted: false,
        });
      }, (error) => {
        this.setState({
          requestFailed: true,
          responseValid: false,
          requestErrorMessage: error,
          formSubmitted: false,
        })
      })
    }
  }

  closeModal() {
    this.setState({responseValid: false,});
  }
}