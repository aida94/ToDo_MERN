import React, { Component } from 'react';
import { Button, Container, ListGroup, ListGroupItem, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../../actions/itemActions';
import { clearErrors } from '../../actions/errorActions';
import ItemModel from './ItemsModal';

class Item extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,

  };

  componentDidMount() {
    // get noteId from url
    const url = window.location.pathname.split('/');
    const noteId = url.pop();

    this.props.getItems(noteId);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { items } = this.props.item;
    
    return (
      <Container className='my-5'>

        {isAuthenticated
          && <div>
            <h3 className='text-secondary'> Notes Name </h3>
            <ItemModel/>
            
            <Container>
              <ListGroup className='mt-5'>  
                {items.map(({ _id, item }) => (
                  <ListGroupItem key={_id} className='w-75'>
                    <CustomInput type='checkbox' id='item1' label=''>
                      <span>{item}</span>
                      <Button className='float-right' color='danger' size='sm' > 
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
  item: state.item,
  error: state.error,
});

export default connect(mapStateToProps, { getItems, clearErrors })(Item);
