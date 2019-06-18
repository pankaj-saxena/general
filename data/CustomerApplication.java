package com.wba.api.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@EnableAutoConfiguration
@SpringBootApplication
public class CustomerApplication  {

    public static void main(String[] args) {
        SpringApplication.run(CustomerApplication.class, args);
    }



}