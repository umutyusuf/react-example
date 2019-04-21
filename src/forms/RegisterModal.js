import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import RegisterForm from './../forms/RegisterForm.js'

export default class RegisterModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.closeModal}>Şimdi Üye Olun!</ModalHeader>
            <Alert color="success" isOpen={!!this.props.additionalMessage}>
              {this.props.additionalMessage}
            </Alert>
          <ModalBody>
            <RegisterForm />
          </ModalBody>
      </Modal>
    );
  }
}