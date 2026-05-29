package com.pallavi.campuscart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CampuscartApplication {
    public static void main(String[] args) {
        SpringApplication.run(CampuscartApplication.class, args);
    }
}