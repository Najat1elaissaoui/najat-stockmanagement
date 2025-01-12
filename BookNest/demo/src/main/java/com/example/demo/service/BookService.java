package com.example.demo.service;

import com.example.demo.entity.Books;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Books saveBook(Books book) {
        return bookRepository.save(book);
    }

    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    // Fetch a book by its ID
    public Books getBookById(int id) {
        return bookRepository.findById((long) id).orElse(null); // Return null if the book is not found
    }

    // Additional business logic methods can go here


    public void incrementAvailableCopies(Long bookId) {
        // Retrieve the book
        Books book = getBookById(Math.toIntExact(bookId));
        if (book == null) {
            throw new RuntimeException("Book not found.");
        }

        // Increment the available copies
        book.setAvailable_copies(book.getAvailable_copies() + 1);

        // Save the updated book
        saveBook(book);
    }



    public void deccrementAvailableCopies(Long bookId) {
        // Retrieve the book
        Books book = getBookById(Math.toIntExact(bookId));
        if (book == null) {
            throw new RuntimeException("Book not found.");
        }

        // Increment the available copies
        book.setAvailable_copies(book.getAvailable_copies() - 1);

        // Save the updated book
        saveBook(book);
    }
}
