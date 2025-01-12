package com.example.demo.service;

import com.example.demo.entity.Books;
import com.example.demo.entity.Reservations;
import com.example.demo.repository.ReservationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationsRepository reservationsRepository;

    @Autowired
    private BookService bookService; // Inject BookService

    // Existing reserveBook method
    public Reservations reserveBook(int userId, int bookId, int dueDays) {
        Reservations reservation = new Reservations();
        reservation.setUserId((long) userId);
        reservation.setBookId((long) bookId);
        reservation.setReservationDate(LocalDate.now());
        reservation.setDueDate(LocalDate.now().plusDays(dueDays));
        reservation.setStatus("Reserved");

        Reservations savedReservation = reservationsRepository.save(reservation);

        Books book = bookService.getBookById(bookId);
        if (book != null && book.getAvailable_copies() > 0) {
            book.setAvailable_copies(book.getAvailable_copies() - 1);
            book.setStatus("Reserved");
            bookService.saveBook(book);
        } else {
            throw new RuntimeException("Book is not available for reservation.");
        }

        return savedReservation;
    }


}
