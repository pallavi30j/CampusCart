package com.pallavi.campuscart.repository;

import com.pallavi.campuscart.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByActiveTrue();
    List<Listing> findByCategoryAndActiveTrue(String category);
    List<Listing> findByTitleContainingIgnoreCaseAndActiveTrue(String title);
    List<Listing> findBySellerId(Long sellerId);
}