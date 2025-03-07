package com.tmsgo.tmsgo_backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity  // JPA 엔터티임을 명시
@Table(name = "sidebar")  // 실제 DB 테이블명
@Getter
@Setter
@NoArgsConstructor
public class Sidebar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // MySQL auto_increment 지원
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;
}
