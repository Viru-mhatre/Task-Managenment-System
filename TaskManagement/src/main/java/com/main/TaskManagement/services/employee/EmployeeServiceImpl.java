package com.main.TaskManagement.services.employee;

import com.main.TaskManagement.dto.CommentDTO;
import com.main.TaskManagement.dto.TaskDTO;
import com.main.TaskManagement.entities.Comment;
import com.main.TaskManagement.entities.Task;
import com.main.TaskManagement.entities.User;
import com.main.TaskManagement.enums.TaskStatus;
import com.main.TaskManagement.repositories.CommentRepository;
import com.main.TaskManagement.repositories.TaskRepository;
import com.main.TaskManagement.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final TaskRepository taskRepository;

    private final JwtUtil jwtUtil;

    private  final CommentRepository commentRepository;

    @Override
    public List<TaskDTO> getTaskByUserId() {
        User user = jwtUtil.getLoggedInUser();
        if (user != null) {
            return taskRepository.findAllByUserId(user.getId())
                    .stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDTO)
                    .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }

    @Override
    public TaskDTO updateTask(Long id, String status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskStatus(mapStringToTaskStatus(status));
            return taskRepository.save(existingTask).getTaskDTO();

        }
        throw new EntityNotFoundException("Task not found");
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDTO).orElse(null);
    }

    @Override
    public CommentDTO createComment(Long taskId, String content) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        User user = jwtUtil.getLoggedInUser();
        if ((optionalTask.isPresent()) && user != null){
            Comment comment = new Comment();
            comment.setCreatedAt(new Date());
            comment.setContent(content);
            comment.setTask(optionalTask.get());
            comment.setUser(user);
            return commentRepository.save(comment).getCommentDTO();
        }
        throw new EntityNotFoundException("User or task not found");
    }

    @Override
    public List<CommentDTO> getCommentByTaskId(Long taskId) {
        return commentRepository.findByTaskId(taskId).stream().map(Comment::getCommentDTO).collect(Collectors.toList());
    }


    private TaskStatus mapStringToTaskStatus(String status){
        return  switch (status){
            case "PENDING" -> TaskStatus.PENDING;
            case  "INPROGRESS" -> TaskStatus.INPROGRESS;
            case  "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELLED;
        };
    }
}

