/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Button, Container, ListGroup, ListGroupItem, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, checkItem, filterItem, deleteItem } from '../../actions/itemActions';
import { clearErrors } from '../../actions/errorActions';
import ItemModel from './ItemsModal';

class Item extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    checkItem: PropTypes.func.isRequired,
    filterItem: PropTypes.func.isRequired,
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

  onFilterClick = (filter) => {
    this.props.filterItem(filter);
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { notes } = this.props.note;
    const { items } = this.props.item;
    const { filter } = this.props.item;

    console.log(filter);
    
    return (
      <Container className='my-5'>

        {isAuthenticated 
          && <div>
            <h3 className='text-secondary'> {notes.map(({ _id, note }) => <span key={_id}> {note.toUpperCase()} </span>)}  </h3>
            <ItemModel/>

            <div className='text-center mt-3'>
              <div className='btn-group'>
                <button type='button' className={`btn btn-light ${filter === 'all' ? 'filterActive' : ''}`} onClick={this.onFilterClick.bind(this, 'all')}>All</button>
                <button type='button' className={`btn btn-light ${filter === 'completed' ? 'filterActive' : ''}`} onClick={this.onFilterClick.bind(this, 'completed')}>Completed</button>
                <button type='button' className={`btn btn-light ${filter === 'notCompleted' ? 'filterActive' : ''}`} onClick={this.onFilterClick.bind(this, 'notCompleted')}>Not Completed</button>
              </div>
            </div>           
            
            <Container>
              <ListGroup className='mt-4'>  
              {items
                && items.map(({ _id, item, is_checked }) => (
                  <ListGroupItem key={_id} className=''>
                    <CustomInput type='checkbox' id={`item${_id}`} label='' checked={ is_checked } onChange={this.onCheckClick.bind(this, _id)} >
                      <span className={ is_checked ? 'checkedItem' : ''}> {item} </span>
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

export default connect(mapStateToProps, { getItems, checkItem, filterItem, deleteItem, clearErrors })(Item);
