import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import AddBook from '../AddBook/AddBook';
import EditBook from '../EditBook/EditBook';
import NotFound from '../NotFound/NotFound';

import './main.sass';

const Main = () => {

  return (
    <main className='main'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addbook' component={AddBook} />
        <Route path='/edit/:id' component={EditBook} />
        <Route path='*' component={NotFound} />
      </Switch>
    </main>
  )
};

export default Main