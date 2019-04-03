import React, { Component } from 'react';
import {
  Button, 
  Container,
  ListGroup, 
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput } from 'reactstrap';

class Item extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      item: '',
    };
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  };

  render() {
    return (
      <Container className='my-5'>

        <h3 className='text-secondary'> Notes Name </h3>

        <Button outline color='secondary' className='mt-4' onClick={this.toggle}>
          Add Item ...
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Item
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item Name</Label>
                <Input type='text' name='item' id='item' placeholder='Item' className='mb-3' onChange={this.onChange}/>
                <Button color='secondary' className='mt-4' block> Add </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        
        <Container>
          <ListGroup className='mt-5'>  
            <ListGroupItem className='w-75'>
              <CustomInput type='checkbox' id='item1' label=''>
                <span>Item 1</span>
                <Button className='float-right' color='danger' size='sm' > 
                  &times;
                </Button>
              </CustomInput>
            </ListGroupItem>  
            <ListGroupItem className='w-75'>
              <CustomInput type='checkbox' id='item2' label=''>
                <span>Item 2</span>
                <Button className='float-right' color='danger' size='sm' > 
                  &times;
                </Button>
              </CustomInput>
            </ListGroupItem>                                                   
          </ListGroup>
        </Container>        
      </Container>
    );
  }
}

export default Item;