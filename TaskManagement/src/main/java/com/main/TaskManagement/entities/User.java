package com.main.TaskManagement.entities;

import com.main.TaskManagement.dto.UserDto;
import com.main.TaskManagement.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;  // Make sure UserRole is an enum

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public String getUsername() {

        return email;  // Using email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Modify based on your requirements
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;  // Modify based on your requirements
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;  // Modify based on your requirements
    }

    @Override
    public boolean isEnabled() {

        return true;  // Modify based on your requirements
    }

    public UserDto getUserDto(){
       UserDto userDto = new UserDto();
       userDto.setId(id);
       userDto.setName(name);
       userDto.setEmail(email);
       userDto.setUserRole(userRole);
       return userDto;
    }


    }
