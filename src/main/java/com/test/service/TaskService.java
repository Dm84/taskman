package com.test.service;

import com.test.dao.*;
import com.test.domain.*;

public class TaskService {
	
	private ITaskDao taskDao;
	
	public TaskService(ITaskDao taskDao) {
		this.taskDao = taskDao;
	}
	
	/**
	 * ������� � ��������� �������
	 * @param task
	 */
	public void create(Task task) {
		taskDao.create(task);
	}
}