package com.example.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "users") // Matches your database table name
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    @Column(name = "user_id")
    private int userId;

    @Column(name = "username", nullable = false, unique = true) // Ensures username is not null and unique
    private String username;

    @Column(name = "email", nullable = false, unique = true) // Ensures email is not null and unique
    private String email;

    @Column(name = "password", nullable = false) // Ensures password is not null
    private String password;

    // Constructors


    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

