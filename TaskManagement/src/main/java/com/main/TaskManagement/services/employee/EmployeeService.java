package com.main.TaskManagement.services.employee;

import com.main.TaskManagement.dto.CommentDTO;
import com.main.TaskManagement.dto.TaskDTO;

import java.util.List;

public interface EmployeeService {

    List<TaskDTO>getTaskByUserId();

    TaskDTO updateTask(Long id, String status);

    TaskDTO getTaskById(Long id);

    CommentDTO createComment(Long taskId, String content);

    List<CommentDTO> getCommentByTaskId(Long taskId);
}
