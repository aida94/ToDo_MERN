import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNotes } from '../../actions/noteActions';
import NotesModal from './NotesModal';
import Note from './Note';


class Notes extends Component { 
  static propTypes = {
    getNotes: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { notes } = this.props.note;
    
    return (
      <Fragment>
        <NotesModal/>

        <div className='row mt-4'>
          {notes.length !== 0 && notes.map(({ _id, note }) => <Note key={_id} id={_id} note={note}/>)} 
          {notes.length === 0 && <h4 className='mt-5 text-secondary text-center'>No notes</h4>} 
        </div> 
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note,
});

export default connect(mapStateToProps, { getNotes })(Notes);
