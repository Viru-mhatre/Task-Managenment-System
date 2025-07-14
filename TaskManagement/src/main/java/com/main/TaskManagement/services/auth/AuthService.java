package com.main.TaskManagement.services.auth;

import com.main.TaskManagement.dto.SignupRequest;
import com.main.TaskManagement.dto.UserDto;

public interface AuthService {

    UserDto signupUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}
