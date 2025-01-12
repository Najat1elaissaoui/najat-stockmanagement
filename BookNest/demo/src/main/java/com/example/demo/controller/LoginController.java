package com.example.demo.controller;

import com.example.demo.entity.Books;
import com.example.demo.entity.Reservations;
import com.example.demo.entity.Users;
import com.example.demo.service.BookService;
import com.example.demo.service.ReservationService;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private ReservationService  reservationService;

    @GetMapping
    public String homeRegister() {
        return "login";
    }

    @PostMapping("/login-user")
    public String loginUser(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            HttpSession session,
            Model model) {

        // Fetch the user by email
        Users user = userService.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // Login successful: store data in session
            session.setAttribute("userId", user.getUserId());
            session.setAttribute("userName", user.getUsername()); // Store username in session
            String userName = user.getUsername();


            // Optional: Add flash attribute for redirection
            model.addAttribute("userName", userName);
            // Retrieve the list of books from the database
            List<Books> books = bookService.getAllBooks();

            // Add the books list to the model
            model.addAttribute("books", books);

            return "redirect:/home"; // Redirect to the home page
        } else {
            // Login failed
            model.addAttribute("message", "Invalid email or password.");
            return "redirect:/login"; // Stay on login page
        }
    }

    @GetMapping("/details/{id}")
    public String bookDetails(@PathVariable("id") int id, Model model, HttpSession session) {
        // Retrieve the book by its ID
        Books book = bookService.getBookById(id);

        if (book == null) {
            // Handle the case where the book is not found (optional)
            model.addAttribute("error", "Book not found");
            return "error"; // Redirect to an error page if needed
        }

        String userName = (String) session.getAttribute("userName");


        // Optional: Add flash attribute for redirection
        model.addAttribute("userName", userName);

        // Add the book details to the model
        model.addAttribute("book", book);

        return "Book-details"; // Return the details.html view
    }

    @GetMapping("/reserve-book/{id}")
    public String bookReserve(@PathVariable("id") int bookId, HttpSession session, Model model) {
        // Get userId from session
        int userId = (int) session.getAttribute("userId");
        /*if (userId == null) {
            model.addAttribute("message", "You must log in to reserve a book.");
            return "redirect:/login";
        }*/

        try {
            // Reserve the book
            //retrieve the due_date
            Books book = bookService.getBookById(bookId);

            if (book == null) {
                throw new RuntimeException("Book not found");
            }

            // Get the due date from the book
            int dueDays = book.getDeadline(); // Assuming `deadline` in the Books entity is the number of days
            Reservations reservation = reservationService.reserveBook(userId, bookId, dueDays);

            // Redirect to success page with reservation details
            model.addAttribute("reservation", reservation);
            return "reservation-success";
        } catch (RuntimeException e) {
            // Handle errors (e.g., book not available)
            model.addAttribute("error", e.getMessage());
            return "error"; // Create an error.html page to show the message
        }
    }

}
