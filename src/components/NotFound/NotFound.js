import { Link } from 'react-router-dom';

import './not-found.sass';

const NotFound = () => {

  return (
    <div className='not-found'>
      <h2>Sorry :(</h2>
      <p>That page cannot be found</p>
      <Link to='/'>Back to the dashboard</Link>
    </div>
  )
};

export default NotFound