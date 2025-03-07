package com.tmsgo.tmsgo_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.tmsgo.tmsgo_backend")
public class TmsgoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TmsgoBackendApplication.class, args);
	}

}
