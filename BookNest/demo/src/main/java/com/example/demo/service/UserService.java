package com.example.demo.service;

import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Save a user to the database
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    // Fetch all users from the database
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a user by ID
    public Optional<Users> getUserById(int userId) {
        return userRepository.findById((long) userId);
    }

    // Delete a user by ID
    public void deleteUserById(int userId) {
        userRepository.deleteById((long) userId);
    }

    // Check if a user exists by ID
    public boolean existsById(int userId) {
        return userRepository.existsById((long) userId);
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
