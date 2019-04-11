/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Button, Container, ListGroup, ListGroupItem, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkItem, deleteItem } from '../../actions/itemActions';


class Item extends Component {
  static propTypes = {
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  };

  onCheckClick = (id) => {
    this.props.checkItem(id);
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    const { items } = this.props.item;
    
    return (        
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
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps, { checkItem, deleteItem })(Item);
