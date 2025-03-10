package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.Vehicle;
import com.example.backend.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    // 🚗 차량 목록 조회
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // 🚗 특정 차량 조회
    public Optional<Vehicle> getVehicleById(Integer vehicleId) {
        return vehicleRepository.findById(vehicleId);
    }

    // 🚗 차량 추가
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // 🚗 차량 수정
    public Vehicle updateVehicle(Integer vehicleId, Vehicle updatedVehicle) {
        return vehicleRepository.findById(vehicleId)
                .map(vehicle -> {
                    vehicle.setLicensePlate(updatedVehicle.getLicensePlate());
                    vehicle.setModel(updatedVehicle.getModel());
                    vehicle.setManufacturer(updatedVehicle.getManufacturer());
                    vehicle.setYear(updatedVehicle.getYear());
                    vehicle.setStatus(updatedVehicle.getStatus());
                    return vehicleRepository.save(vehicle);
                })
                .orElseThrow(() -> new RuntimeException("차량을 찾을 수 없습니다."));
    }

    // 🚗 차량 삭제
    public void deleteVehicle(Integer vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }
}



