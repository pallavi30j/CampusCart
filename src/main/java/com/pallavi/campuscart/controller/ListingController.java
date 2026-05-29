package com.pallavi.campuscart.controller;

import com.pallavi.campuscart.dto.ListingRequest;
import com.pallavi.campuscart.model.Listing;
import com.pallavi.campuscart.model.User;
import com.pallavi.campuscart.repository.UserRepository;
import com.pallavi.campuscart.service.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    private final ListingService listingService;
    private final UserRepository userRepository;

    public ListingController(ListingService listingService, UserRepository userRepository) {
        this.listingService = listingService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Listing> getAllListings() {
        return listingService.getAllListings();
    }

    @GetMapping("/search")
    public List<Listing> search(@RequestParam String keyword) {
        return listingService.searchListings(keyword);
    }

    @GetMapping("/category/{category}")
    public List<Listing> getByCategory(@PathVariable String category) {
        return listingService.getByCategory(category);
    }

    @PostMapping
    public ResponseEntity<?> createListing(
            @RequestBody ListingRequest request,
            @RequestParam Long userId) {
        User seller = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Listing listing = listingService.createListing(request, seller);
        return ResponseEntity.ok(listing);
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<?> viewListing(@PathVariable Long id) {
        Long views = listingService.incrementViewCount(id);
        return ResponseEntity.ok(Map.of("listingId", id, "views", views));
    }

    @GetMapping("/{id}/views")
    public ResponseEntity<?> getViews(@PathVariable Long id) {
        Long views = listingService.getViewCount(id);
        return ResponseEntity.ok(Map.of("listingId", id, "views", views));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable Long id) {
        listingService.deleteListing(id);
        return ResponseEntity.ok(Map.of("message", "Listing removed"));
    }
}