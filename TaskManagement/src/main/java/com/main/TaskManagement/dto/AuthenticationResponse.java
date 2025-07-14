package com.main.TaskManagement.dto;

import com.main.TaskManagement.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private  String jwt;

    private  Long userId;

    private UserRole userRole;
}
