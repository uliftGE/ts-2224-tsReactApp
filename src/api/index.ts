import { Book, BookListResponse, BookResponse } from '../type/book';
const BASE_URL = 'http://localhost:4000/books';
const MESSAGES = {
  saveSuccess: '리뷰가 저장되었습니다.',
  saveError: '리뷰 저장에 실패했습니다.',
  saveNetworkError: '리뷰 저장 중 오류가 발생했습니다.',
};

// 서버에서 책 데이터 가져오기
export const fetchBooks = async (): Promise<Book[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const data: BookListResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

// 서버에서 책 데이터 가져오기
export const fetchBookDetail = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    const data: BookResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
  }
};

// 책 데이터 업데이트 하기
export const updateBook = async (id: number, review: Book['review']) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review }),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to update read status');
      alert(MESSAGES.saveError);
    }
  } catch (error) {
    console.error('Error updating read status:', error);
    alert(MESSAGES.saveNetworkError);
  }
};

// 4. 새로운 책 추가하기
export const addBook = async (
  title: string,
  description: string,
  genre: string,
  coverImage: string
): Promise<Book | undefined> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, genre, coverImage }),
    });

    if (response.ok) {
      const data: BookResponse = await response.json();
      return data.data;
    } else {
      console.error('Failed to add book');
      return undefined;
    }
  } catch (error) {
    console.error('Error adding book:', error);
    return undefined;
  }
};
