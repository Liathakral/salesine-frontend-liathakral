<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1>Sign Up</h1>
      <form @submit.prevent="signUp">
        <div class="input-group">
          <label for="name">Name</label>
          <input type="text" v-model="name" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post("http://localhost:3001/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/tasks");
      } catch (err) {
        this.error = "Error signing up. Please try again.";
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.signup-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
