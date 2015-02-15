package com.taskman.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name="task")
public class Task {
	
    @Id
    @Column(name="id")
    @GeneratedValue
    private Integer id = 0;	
	
    @Column(name="description", nullable=false)    
    @Size(min=1)
	private String description;    
    
    @Column(name="deadline", nullable=false)
    private java.util.Date deadline;
    
    @Column(name="completed")
    private boolean completed = false;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public java.util.Date getDeadline() {
		return deadline;
	}

	public void setDeadline(long deadline) {
		this.deadline = new java.sql.Timestamp(deadline);
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	} 
	
}