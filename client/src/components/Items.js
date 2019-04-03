import React, { Component, Fragment } from 'react';
import {
  Card, 
  Button, 
  CardHeader,
  CardFooter, 
  CardBody,
  ListGroup, 
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap';

class Items extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      note: '',
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
      <Fragment>
        
        <Button outline color='warning' className='mt-4' onClick={this.toggle}>
          Take a note ...
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Note
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='note'>Note Name</Label>
                <Input type='text' name='note' id='note' placeholder='Note' className='mb-3' onChange={this.onChange}/>
                <Button color='warning' className='mt-4' block> Add </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


        <div className='row mt-4'>
          <div className='col-3 mb-4'>
          <Card outline color='warning' className='m-2'>
            <CardHeader className='list-group-item-warning'>Note1</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='list-group-item-warning'>
              <a className='cardLink' href='/note'>Show more</a>
            </CardFooter>
          </Card>
          </div>

          <div className='col-3 mb-4 '>
          <Card className='m-2'>
            <CardHeader>Note</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='text-muted'>Show more </CardFooter>
          </Card>
          </div>

          <div className='col-3 mb-4 '>
          <Card className='m-2'>
            <CardHeader>Note</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='text-muted'>Show more </CardFooter>
          </Card>
          </div>

          <div className='col-3 mb-4 '>
          <Card className='m-2'>
            <CardHeader>Note</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='text-muted'>Show more </CardFooter>
          </Card>
          </div>

          <div className='col-3 mb-4 '>
          <Card className='m-2'>
            <CardHeader>Note</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='text-muted'>Show more </CardFooter>
          </Card>
          </div>

          <div className='col-3 mb-4 '>
          <Card className='m-2'>
            <CardHeader>Note</CardHeader>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              </ListGroup>
            </CardBody>
            <CardFooter className='text-muted'>Show more </CardFooter>
          </Card>
          </div>
          
        </div>
      </Fragment>
    );
  }
}

export default Items;