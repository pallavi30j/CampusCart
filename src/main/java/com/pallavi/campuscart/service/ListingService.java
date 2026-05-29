package com.pallavi.campuscart.service;

import com.pallavi.campuscart.dto.ListingRequest;
import com.pallavi.campuscart.model.Listing;
import com.pallavi.campuscart.model.User;
import com.pallavi.campuscart.repository.ListingRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final Map<Long, Long> viewCounts = new HashMap<>();

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public Listing createListing(ListingRequest request, User seller) {
        Listing listing = new Listing();
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setCategory(request.getCategory());
        listing.setCondition(request.getCondition());
        listing.setImageUrl(request.getImageUrl());
        listing.setSeller(seller);
        return listingRepository.save(listing);
    }

    public List<Listing> getAllListings() {
        return listingRepository.findByActiveTrue();
    }

    public List<Listing> searchListings(String keyword) {
        return listingRepository.findByTitleContainingIgnoreCaseAndActiveTrue(keyword);
    }

    public List<Listing> getByCategory(String category) {
        return listingRepository.findByCategoryAndActiveTrue(category);
    }

    public Long incrementViewCount(Long listingId) {
        viewCounts.put(listingId, viewCounts.getOrDefault(listingId, 0L) + 1);
        return viewCounts.get(listingId);
    }

    public Long getViewCount(Long listingId) {
        return viewCounts.getOrDefault(listingId, 0L);
    }

    public void deleteListing(Long id) {
        listingRepository.findById(id).ifPresent(listing -> {
            listing.setActive(false);
            listingRepository.save(listing);
        });
    }
}