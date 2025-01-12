package com.example.demo.repository;

import com.example.demo.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Books, Long> {
    // Custom query methods (if needed) can be defined here
}

