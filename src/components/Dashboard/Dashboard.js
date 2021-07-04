import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './dashboard.sass';

const Dashboard = ({ books, confirmDelete }) => {
  const { push } = useHistory();

  return (
    <table className='table'>
      <thead className='table__header'>
        <tr className='table__header__row'>
          <th className='table__header__col'>Title</th>
          <th className='table__header__col'>Author</th>
          <th className='table__header__col'>Category</th>
          <th className='table__header__col'>ISBN</th>
          <th className='table__header__col'>Actions</th>
        </tr>
      </thead>
      <tbody className='table__body'>
        {books.map((item) => {
          return (
            <tr className='table__body__row' key={item.id}>
              <th className='table__body__col'><span className='table__body__col__title'>Title:</span>{item.title}</th>
              <th className='table__body__col'><span className='table__body__col__title'>Author:</span>{item.author}</th>
              <th className='table__body__col'><span className='table__body__col__title'>Category:</span>{item.category}</th>
              <th className='table__body__col'><span className='table__body__col__title'>ISBN:</span>{item.isbn}</th>
              <th className='table__body__col table__buttons'>
                <button
                  className='table__button table__button--edit'
                  type='button'
                  onClick={() => push(`/edit/${item.id}`)}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  className='table__button table__button--delete'
                  onClick={() => confirmDelete(item.id, item.title)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default Dashboard