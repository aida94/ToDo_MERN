/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import { Button, ListGroupItem, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkItem, deleteItem } from '../../actions/itemActions';


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  static propTypes = {
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  }

  onCheckClick = (id) => {
    this.props.checkItem(id);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {    
    return (        
      <Fragment>
        <ListGroupItem key={this.props.id} className=''>
          <CustomInput type='checkbox' id={`item${this.props.id}`} label='' checked={ this.props.isChecked } onChange={this.onCheckClick.bind(this, this.props.id)} >
            <span className={ this.props.isChecked ? 'checkedItem' : ''}> {this.props.item} </span>
            <Button className='float-right' color='danger' size='sm' onClick={this.toggle}> 
              &times;
            </Button>
          </CustomInput>
        </ListGroupItem>

        {/* delete confirmation modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modalContent'>
          <ModalHeader toggle={this.toggle} >
            Delete Confirmation
          </ModalHeader>
          <ModalBody>
            <h6> Are you sure you want to delete <b>{this.props.item.charAt(0).toUpperCase() + this.props.item.slice(1)}</b> ?</h6>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onDeleteClick.bind(this, this.props.id)}>Yes</Button>
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { checkItem, deleteItem })(Item);
