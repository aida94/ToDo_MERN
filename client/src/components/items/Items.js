/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, filterItem } from '../../actions/itemActions';
import ItemModel from './ItemsModal';
import Item from './Item';

class Items extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    filterItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onFilterClick = (filter) => {
    this.props.filterItem(filter);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { notes } = this.props.note;
    const { filter } = this.props.item;
    
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
            
            <Item/>
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
});

export default connect(mapStateToProps, { getItems, filterItem })(Items);
