package com.main.TaskManagement.repositories;


import com.main.TaskManagement.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitleContaining(String title);

    List<Task> findAllByUserId(Long id);
}
