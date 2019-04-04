import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem, itemAdded } from '../../actions/itemActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class ItemModel extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      item: '',
      msg: null
    };
  };

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    itemAdded: PropTypes.func.isRequired,
    item_added: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if(error !== prevProps.error) {
        //Check for add error
        if(error.id === 'ADD_ITEM_FAIL') {
            this.setState({ msg: error.msg.msg });
        }else {
            this.setState({ msg: null });
        }
    };

    // if authenticated close modal
    if(this.state.modal && this.props.item_added) {
      this.toggle();
      this.props.itemAdded();
    };
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
      item: ''
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      item: this.state.item,
      note: '5ca5fd1fad2fd125b41e2fff'
    }

    // Add item via addItem action
    this.props.addItem(newItem);
  };
  
  render() {
    return (
      <Fragment>
        <Button outline color='secondary' className='mt-4' onClick={this.toggle}>
          Add Item ...
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Item
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert>: '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item Name</Label>
                <Input type='text' name='item' id='item' placeholder={this.state.item} className='mb-3' onChange={this.onChange}/>
                <Button color='secondary' className='mt-4' block> Add </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>       
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  item_added: state.item.item_added,
  error: state.error
});
  

export default connect(mapStateToProps, { addItem, itemAdded,  clearErrors })(ItemModel);