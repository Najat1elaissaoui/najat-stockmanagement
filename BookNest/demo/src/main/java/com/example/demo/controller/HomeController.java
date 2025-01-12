package com.example.demo.controller;

import com.example.demo.service.BookService;
import com.example.demo.entity.Books;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private BookService bookService;

    @GetMapping("/")
    public String home(Model model, HttpSession session) {
        // Retrieve the list of books from the database
        List<Books> books = bookService.getAllBooks();

        // Add the books list to the model
        model.addAttribute("books", books);

        // Get the username from the session
        String userName = (String) session.getAttribute("userName");
        model.addAttribute("userName", userName);

        return "index";
    }

    @GetMapping("/home")
    public String homeUser(Model model, HttpSession session) {
        // Retrieve the list of books from the database
        List<Books> books = bookService.getAllBooks();

        // Add the books list to the model
        model.addAttribute("books", books);

        // Get the username from the session
        String userName = (String) session.getAttribute("userName");
        model.addAttribute("userName", userName);

        return "HomeUser"; // This will return the HomeUser.html view
    }
}