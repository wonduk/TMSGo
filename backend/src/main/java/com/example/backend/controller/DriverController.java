package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Driver;
import com.example.backend.service.DriverService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dispatch/driver")
@RequiredArgsConstructor
public class DriverController {
    private final DriverService driverService;

    // 모든 운전자 조회
    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

//    //특정 운전자 조회
//    @GetMapping("/{id}")
//    public ResponseEntity<Driver> getDriverById(@PathVariable Integer id) {
//        Optional<Driver> driver = driverService.getDriverById(id);
//        return driver.map(ResponseEntity::ok)
//                     .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // 운전자 추가
//    @PostMapping
//    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
//        return ResponseEntity.ok(driverService.createDriver(driver));
//    }
//
//    //  운전자 수정
////    @PutMapping("/{id}")
////    public ResponseEntity<Driver> updateDriver(@PathVariable Integer id, @RequestBody Driver driver) {
////        return ResponseEntity.ok(driverService.updateDriver(id, driver));
////    }
//
//    // 운전자 삭제
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDriver(@PathVariable Integer id) {
//        driverService.deleteDriver(id);
//        return ResponseEntity.noContent().build();
//    }
}


