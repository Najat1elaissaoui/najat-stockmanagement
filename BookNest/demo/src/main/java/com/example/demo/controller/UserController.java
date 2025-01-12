package com.example.demo.controller;
import com.example.demo.service.BookService;
import com.example.demo.entity.Books;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public String homeUser(Model model) {
        // Retrieve the list of books from the database
        List<Books> books = bookService.getAllBooks();

        // Add the books list to the model
        model.addAttribute("books", books);

        return "HomeUser"; // This will return the index.html view
    }

    /*@GetMapping("/details/{id}")
    public String bookDetails(@PathVariable("id") int id, Model model) {
        // Retrieve the book by its ID
        Books book = bookService.getBookById(id);

        if (book == null) {
            // Handle the case where the book is not found (optional)
            model.addAttribute("error", "Book not found");
            return "error"; // Redirect to an error page if needed
        }

        // Add the book details to the model
        model.addAttribute("book", book);

        return "Book-details"; // Return the details.html view
    }

    @GetMapping("/reserve-book/{id}")
    public String bookReserve(@PathVariable("id") int id, Model model) {
        // Retrieve the book by its ID
        return "lll";

    }*/


}
