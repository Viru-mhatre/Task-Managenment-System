package com.main.TaskManagement.dto;

import com.main.TaskManagement.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private  Long id;

    private  String name;

    private  String email;

    private  String password;

    private UserRole userRole;

}
