package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.MMMenu;

public interface MMMenuRepository extends JpaRepository<MMMenu, Integer> {
}
