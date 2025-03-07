package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.MMMenu;
import com.example.backend.service.MMMenuService;

@RestController
@RequestMapping("/api/menus")
public class MMMenuController {

    private final MMMenuService menuService;
    
    @Autowired
    public MMMenuController(MMMenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<MMMenu> getAllMenus() {
        List<MMMenu> menus = menuService.getAllMenus();
        System.out.println("📌 컨트롤러에서 반환할 메뉴 리스트: " + menus);
        return menus;
    }

    @PostMapping
    public MMMenu addMenu(@RequestBody MMMenu menu) {
        return menuService.addMenu(menu);
    }
}

