import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import useFetch from '../hooks/useFetch';

import modalStyle from '../ModalStyle/style';
import '../AddBook/add-book.sass';

const EditBook = () => {
  Modal.setAppElement('#root');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Classics');
  const [isbn, setIsbn] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const { data: book, error, isPending } = useFetch(`http://localhost:8000/books/${id}`);

  useEffect(() => {
    if (book) {
      const { title, author, category, isbn } = book;

      setTitle(title);
      setAuthor(author);
      setCategory(category);
      setIsbn(isbn);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedBook = { title, author, category, isbn, id };

    fetch(`http://localhost:8000/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedBook)
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
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {book && (
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
          <button type='submit'>Save</button>
        </form>
      )}
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
      >
        <h2 className='modal__header'>The book has been successfully edited</h2>
        <div className='modal__buttons'>
          <button onClick={() => handleOK()}>OK</button>
        </div>
      </Modal>
    </div>
  )
};

export default EditBook