package com.tmsgo.tmsgo_backend.common.controller;

import org.springframework.web.bind.annotation.*;

import com.tmsgo.tmsgo_backend.common.repository.SidebarRepository;
import com.tmsgo.tmsgo_backend.common.service.SidebarService;
import com.tmsgo.tmsgo_backend.entity.Sidebar;

import java.util.List;

@RestController
@RequestMapping("/common")
public class SidebarController {

    private final SidebarService sidebarService;

    public SidebarController(SidebarService sidebarService) {
        this.sidebarService = sidebarService;
    }

    @GetMapping("/getSidebar")
    public List<Sidebar> getSidebarMenu() {
        return sidebarService.getSidebarMenu();
    }
}
