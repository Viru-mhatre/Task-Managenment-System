package com.main.TaskManagement.services.admin;

import com.main.TaskManagement.dto.CommentDTO;
import com.main.TaskManagement.dto.TaskDTO;
import com.main.TaskManagement.dto.UserDto;

import java.util.List;

public interface AdminService {

    List<UserDto> getUsers();

    TaskDTO createTask(TaskDTO taskDTO);

    List<TaskDTO> getAllTask();

   void deleteTask(Long id);

  TaskDTO getTaskById(Long id);

  TaskDTO updateTask(Long id,TaskDTO taskDTO);

    List<TaskDTO> searchTaskByTitle(String title);

    CommentDTO createComment(Long taskId, String content);

    List<CommentDTO> getCommentByTaskId(Long taskId);
}
