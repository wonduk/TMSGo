package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.entity.Driver;
import com.example.backend.repository.DriverRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DriverService {
	
	private final DriverRepository driverRepository;

    // 모든 운전자 조회
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // 특정 운전자 조회
    public Optional<Driver> getDriverById(Integer driverId) {
        return driverRepository.findById(driverId);
    }

    // 운전자 추가
    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // 운전자 수정
    public Driver updateDriver(Integer driverId, Driver updatedDriver) {
        return driverRepository.findById(driverId)
                .map(driver -> {
                    driver.setName(updatedDriver.getName());
                    driver.setPhoneNumber(updatedDriver.getPhoneNumber());
                    driver.setLicenseNumber(updatedDriver.getLicenseNumber());
                    driver.setStatus(updatedDriver.getStatus());
                    return driverRepository.save(driver);
                })
                .orElseThrow(() -> new RuntimeException("운전자를 찾을 수 없습니다."));
    }

    // 운전자 삭제
    public void deleteDriver(Integer driverId) {
        driverRepository.deleteById(driverId);
    }
}


