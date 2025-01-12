package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping("/reservations")
public class ReservationsController {

    @GetMapping
    public String Reservations(@SessionAttribute("userId") Long userId, Model model) {
        // Fetch reservations for the logged-in user
        /*List<ReservationDTO> reservations = reservationService.getReservationsByUserId(userId);

        // Add reservations to the model to display in the view
        model.addAttribute("reservations", reservations);*/

        return "Reservations"; // Ensure this maps to your template file
    }
}
