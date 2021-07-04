import React, { useState } from 'react';
import Modal from 'react-modal';
import useFetch from '../hooks/useFetch';

import Dashboard from '../Dashboard/Dashboard';
import Loading from '../Loading/Loading';

import modalStyle from '../ModalStyle/style';
import './home.sass';
import '../Loading/loading.sass';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [deletedTitle, setDeletedTitle] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  const confirmDelete = (id, title) => {
    setDeletedId(id);
    setDeletedTitle(title);
    setModalIsOpen(true);
  }

  const cancelDelete = () => {
    setModalIsOpen(false);
    setDeletedTitle(null);
    setDeletedId(null);
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/books/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setUpdateFlag(prevUpdateFlag => !prevUpdateFlag);
    });
    setModalIsOpen(false);
    setDeletedTitle(null);
    setDeletedId(null);
  }

  const { data: books, isPending, error } = useFetch('http://localhost:8000/books', updateFlag);

  return (
    <div className='dashboard'>
      {error && <div className='error'>{error}</div>}
      {isPending && <Loading />}
      {books && <Dashboard books={books} confirmDelete={confirmDelete} />}
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
      >
        <h2 className='modal__header'>Delete {deletedTitle} ?</h2>
        <div className='modal__buttons'>
          <button onClick={() => cancelDelete()}>No</button>
          <button onClick={() => handleDelete(deletedId)}>Yes</button>
        </div>
      </Modal>
    </div>
  )
};

export default Home