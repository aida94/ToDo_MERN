/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Container, ListGroup, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, filterItem, checkItem, deleteItem } from '../../actions/itemActions';
import ItemModel from './ItemsModal';
import Item from './Item';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    filterItem: PropTypes.func.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  componentDidMount() {
    this.props.getItems();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.itemMessage !== this.props.item.itemMessage) {
      this.interval = setInterval(() => this.onDismiss(), 3000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onFilterClick = (filter) => {
    this.props.filterItem(filter);
  }

  onCheckClick = (id) => {
    this.props.checkItem(id);
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;
    const { notes } = this.props.note;
    const { filter } = this.props.item;
    const { items } = this.props.item;
    const { itemMessage } = this.props.item;
    
    return (
      <Container>

        {itemMessage && <Alert isOpen={this.state.visible} toggle={this.onDismiss} color="success"> {itemMessage} successfully added </Alert>}

        {isAuthenticated 
          && <div className='my-5'>
            <h3 className='text-secondary'> {notes.map(({ _id, note }) => <span key={_id}> {note.charAt(0).toUpperCase() + note.slice(1)} </span>)}  </h3>
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
                {items.length !== 0 && items.map(({ _id, item, is_checked }) => <Item key={_id} id={_id} item={item} isChecked={is_checked} />)}
                {items.length === 0 && <h4 className='mt-5 text-secondary text-center'>No items</h4>} 
              </ListGroup>
            </Container> 
          </div>
        }
        
        {!isAuthenticated 
          && <div className='my-5'>
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
});

export default connect(mapStateToProps, { getItems, filterItem, checkItem, deleteItem })(Items);
