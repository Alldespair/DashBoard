import React, { useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

import modalStyle from '../ModalStyle/style';
import './add-book.sass';

const AddBook = () => {
  Modal.setAppElement('#root');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Classics');
  const [isbn, setIsbn] = useState('');
  const history = useHistory();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, category, isbn };

    fetch('http://localhost:8000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(() => {
      setModalIsOpen(true);
    })
  };

  const handleOK = () => {
    setModalIsOpen(false);
    history.push('/');
  };

  return (
    <div className='add-book'>
      <form className='form' onSubmit={handleSubmit}>
        <label>Book title</label>
        <input
          type='text'
          required
          pattern='^[a-zA-Z0-9.-]*$'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author name</label>
        <input
          type='text'
          required
          pattern='^[a-zA-Z0-9.-]*$'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Category</label>
        <select
          value={category}
          onChange={((e) => setCategory(e.target.value))}
        >
          <option value='Classics'>Classics</option>
          <option value='Detective'>Detective</option>
          <option value='Historical'>Historical</option>
          <option value='Fantasy'>Fantasy</option>
        </select>
        <label>ISBN</label>
        <input
          type='text'
          pattern='^[0-9]{10,13}$'
          required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button type='submit'>Add a book</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
      >
        <h2 className='modal__header'>The book has been successfully added</h2>
        <div className='modal__buttons'>
          <button onClick={() => handleOK()}>OK</button>
        </div>
      </Modal>
    </div>
  )
};

export default AddBook