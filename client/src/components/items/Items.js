/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Button, Container, ListGroup, ListGroupItem, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, checkItem, deleteItem } from '../../actions/itemActions';
import { clearErrors } from '../../actions/errorActions';
import ItemModel from './ItemsModal';

class Item extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onCheckClick = (id) => {
    this.props.checkItem(id);
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { notes } = this.props.note;
    const { items } = this.props.item;
    
    return (
      <Container className='my-5'>

        {isAuthenticated 
          && <div>
            <h3 className='text-secondary'> {notes.map(({ _id, note }) => <span key={_id}> {note.toUpperCase()} </span>)}  </h3>
            <ItemModel/>
            
            <Container>
              <ListGroup className='mt-5'>  
              {items
                && items.map(({ _id, item, is_checked }) => (
                  <ListGroupItem key={_id} className='w-75'>
                    <CustomInput type='checkbox' id={`item${_id}`} label='' checked={ is_checked } onChange={this.onCheckClick.bind(this, _id)} >
                      <span className={ is_checked ? 'checked_item' : ''}> {item} </span>
                      <Button className='float-right' color='danger' size='sm' onClick={this.onDeleteClick.bind(this, _id)}> 
                        &times;
                      </Button>
                    </CustomInput>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Container> 
          </div>
        }
        
        {!isAuthenticated 
          && <div>
            <h4 className='text-center mt-5'>You are not authorized to access. <br/> Please login first</h4>
          </div>
        }
 
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note,
  item: state.item,
  error: state.error,
});

export default connect(mapStateToProps, { getItems, checkItem, deleteItem, clearErrors })(Item);
