import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardFooter, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../../actions/noteActions';
import { clearErrors } from '../../actions/errorActions';
import NotesModal from './NotesModal';


class Notes extends Component { 
  static propTypes = {
    getNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getNotes();
  }

  onDeleteClick = (id) => {
    this.props.deleteNote(id);
  };

  render() {
    const { notes } = this.props.note;
    return (
      <Fragment>
        <NotesModal/>

         <div className='row mt-4'>
          {notes
            && notes.map(({ _id, note }) => (
              <div className='col-3 mb-4' key={_id}>
                <Card outline color='warning' className='m-2'>
                  <CardHeader className='list-group-item-warning'>{note}</CardHeader>
                  <CardBody>
                    <ListGroup flush>
                      <ListGroupItem>item1</ListGroupItem>
                      <ListGroupItem>item2</ListGroupItem>
                    </ListGroup>
                  </CardBody>
                  <CardFooter className='list-group-item-warning'>
                    <Link to={`/note/${_id}`} className='cardLink'>Show more</Link>
                    /
                    <a className='cardLink' href='#remove' onClick={this.onDeleteClick.bind(this, _id)}>Remove Note</a>
                  </CardFooter>
                </Card>
              </div>
            ))} 
        </div> 
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note,
  error: state.error,
});

export default connect(mapStateToProps, { getNotes, deleteNote, clearErrors })(Notes);
