<template>
  <div class="tasks-container">
   
    <div class="tasks-box">
      <form @submit.prevent="createTask" class="task-form">
        <div class="input-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div class="input-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <button type="submit">Create New Task</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="tasks-list">
        <div v-for="task in tasks" :key="task._id" class="task-item">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <div class="task-actions">
            <button @click="updateTask(task._id)">Update</button>
            <button @click="deleteTask(task._id)">Delete</button>
          </div>
          <div class="update-form" v-if="task._id === taskIdBeingUpdated">
            <input type="text" v-model="updatedTitle" placeholder="New Title" />
            <textarea
              v-model="updatedDescription"
              placeholder="New Description"
            ></textarea>
            <button @click="submitUpdate(task._id)">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      title: "",
      description: "",
      error: null,
      taskIdBeingUpdated: null, 
      updatedTitle: "",
      updatedDescription: "",
    };
  },
  created() {
    this.fetchTasks();
    
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3001/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.tasks = response.data;
      } catch (err) {
        console.error("Error fetching tasks:", err);
        this.error = "Failed to fetch tasks.";
      }
    },
    async createTask() {
      try {
        const response = await axios.post(
          "http://localhost:3001/tasks",
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.tasks.push(response.data);
        console.log(response.data._id);
        this.title = "";
        this.description = "";
      } catch (error) {
        console.error("Error creating task:", error);
        this.error = "Failed to create task.";
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3001/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
        this.error = "Failed to delete task.";
      }
    },
    
 
    async updateTask(taskId) {
     
      this.taskIdBeingUpdated = taskId;

     
      const taskToUpdate = this.tasks.find((task) => task._id === taskId);
      this.updatedTitle = taskToUpdate.title;
      this.updatedDescription = taskToUpdate.description;
    },
    async submitUpdate(taskId) {
      try {
        await axios.put(
          `http://localhost:3001/tasks/${taskId}`,
          {
            title: this.updatedTitle,
            description: this.updatedDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      
        const updatedTaskIndex = this.tasks.findIndex(
          (task) => task._id === taskId
        );
        if (updatedTaskIndex !== -1) {
          this.tasks[updatedTaskIndex].title = this.updatedTitle;
          this.tasks[updatedTaskIndex].description = this.updatedDescription;
        }

      
        this.updatedTitle = "";
        this.updatedDescription = "";
        this.taskIdBeingUpdated = null;
      } catch (error) {
        console.error("Error updating task:", error);
        this.error = "Failed to update task.";
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  height: 60vh;
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.user-info {
  font-size: 1rem;
  color: #555;
}

.tasks-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
  overflow-y: auto;
}

.task-form .input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.task-form .input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.task-form .input-group input,
.task-form .input-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.task-form button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.task-form button:hover {
  background: #0056b3;
}

.tasks-list {
  margin-top: 2rem;
}

.task-item {
  background: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: left;
}

.task-item h3 {
  margin: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.task-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.task-actions button:nth-child(1) {
  background: #28a745;
  color: white;
}

.task-actions button:nth-child(1):hover {
  background: #218838;
}

.task-actions button:nth-child(2) {
  background: #dc3545;
  color: white;
}

.task-actions button:nth-child(2):hover {
  background: #c82333;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
