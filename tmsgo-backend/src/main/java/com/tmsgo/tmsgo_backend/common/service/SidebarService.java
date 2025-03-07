package com.tmsgo.tmsgo_backend.common.service;

import org.springframework.stereotype.Service;

import com.tmsgo.tmsgo_backend.common.repository.SidebarRepository;
import com.tmsgo.tmsgo_backend.entity.Sidebar;

import java.util.List;

@Service
public class SidebarService {

	private final SidebarRepository sidebarMapper;

    public SidebarService(SidebarRepository sidebarMapper) {
        this.sidebarMapper = sidebarMapper;
    }

    public List<Sidebar> getSidebarMenu() {
        return sidebarMapper.getSidebarMenu();
    }
}