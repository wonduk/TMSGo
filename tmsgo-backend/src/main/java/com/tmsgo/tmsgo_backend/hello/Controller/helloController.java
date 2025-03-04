package com.tmsgo.tmsgo_backend.hello.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {
    
    @GetMapping(value = "/api/hello")
    public String hello() {
        System.out.println("헬로헬로");
        return "Hello, TMSGO!";
    }
}
