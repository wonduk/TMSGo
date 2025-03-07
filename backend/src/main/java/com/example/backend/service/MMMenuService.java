package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.entity.MMMenu;
import com.example.backend.repository.MMMenuRepository;

@Service
public class MMMenuService {
    private final MMMenuRepository menuRepository;

    public MMMenuService(MMMenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<MMMenu> getAllMenus() {
    	List<MMMenu> menus = menuRepository.findAll();
        return menuRepository.findAll();
    }

    public MMMenu addMenu(MMMenu menu) {
        return menuRepository.save(menu);
    }
}


