package com.example.demo.controller;

import com.example.demo.entity.Books;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/*@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String home() {
        return "HomeAdmin"; // This should match the name of your Thymeleaf template without the .html extension
    }
}*/





@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public String homeAdmin(Model model) {
        // Retrieve the list of books from the database
        List<Books> books = bookService.getAllBooks();

        // Add the books list to the model
        model.addAttribute("books", books);

        return "HomeAdmin"; // This will return the index.html view
    }

    @PostMapping("/add-book")
    public String addBook(@RequestParam int book_id,
                          @RequestParam String title,
                          @RequestParam String author,
                          @RequestParam String genre,
                          @RequestParam int available_copies,
                          @RequestParam int deadline,
                          @RequestParam String status,
                          @RequestParam String image_url,
                          @RequestParam String abstractText) {
        Books book = new Books();
        //book_id = Integer.parseInt(book_id);
        book.setBook_id(book_id);
        book.setTitle(title);
        book.setAuthor(author);
        book.setGenre(genre);
        book.setAvailable_copies(available_copies);
        book.setStatus(status);
        book.setDeadline(deadline);
        book.setImage_url(image_url);
        book.setAbstractText(abstractText);
        bookService.saveBook(book);
        return "redirect:/home";
    }
}

