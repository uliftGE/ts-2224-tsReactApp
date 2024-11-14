import React, { useState } from 'react';
import { Book } from './BookList.tsx';

type BookDetailModalProps = {
  onClose: () => void;
  book: Book;
  updateBookReview: (id: number, review: Book['review']) => void; // 인덱스드 액세스 타입 적용
};
const MESSAGES = {
  saveSuccess: '리뷰가 저장되었습니다.',
  saveError: '리뷰 저장에 실패했습니다.',
  saveNetworkError: '리뷰 저장 중 오류가 발생했습니다.',
};

const BookDetailModal = ({
  book,
  onClose,
  updateBookReview,
}: BookDetailModalProps) => {
  const [review, setReview] = useState(book.review || '');

  const saveReview = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });
      if (response.ok) {
        updateBookReview(book.id, review);
        alert(MESSAGES.saveSuccess);
      } else {
        alert(MESSAGES.saveError);
      }
    } catch (error) {
      console.error('Error saving review:', error);
      alert(MESSAGES.saveNetworkError);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>{book.title}</h2>
        <p style={styles.description}>{book.description}</p>
        <p style={styles.genre}>장르: {book.genre}</p>
        <img src={book.coverImage} alt='커버 이미지' style={styles.img} />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder='리뷰를 입력하세요.'
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button onClick={saveReview} style={styles.saveButton}>
            저장
          </button>
          <button onClick={onClose} style={styles.closeButton}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    width: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
  genre: {
    fontSize: '14px',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  img: {
    width: '300px',
    height: '400px',
  },
  textarea: {
    width: '80%',
    height: '80px',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BookDetailModal;
