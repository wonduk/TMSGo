package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MM_MENU")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MMMenu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 255)
    @JsonProperty("name") // 🔥 JSON 변환 시 필드명 유지
    private String name;

    @Column(name = "PATH", nullable = false, length = 255)
    @JsonProperty("path")
    private String path;

    @Column(name = "MENU_CODE", nullable = false, length = 255)
    @JsonProperty("menuCode")
    private String menuCode;

    @Column(name = "CSS_CLASS", nullable = false, length = 255)
    @JsonProperty("cssClass")
    private String cssClass;

    @Override
    public String toString() {
        return "MMMenu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", menuCode='" + menuCode + '\'' +
                ", cssClass='" + cssClass + '\'' +
                '}';
    }
}
