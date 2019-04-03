import React, { Component} from 'react';
import { Container } from 'reactstrap';

class NotFound extends Component {
  render() {
    return (
      <Container className='mt-5'>
        <div className='text-center mt-5'>
          <h3 className='mt-5'>Page Not Found</h3>
        </div>
      </Container>
        
    );
  }
}

export default NotFound;