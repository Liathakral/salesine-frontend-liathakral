<template>
  <div id="app">
    <router-link v-if="!isLoginPage" class="button" to="/login">Login</router-link>
    <header>
      <h1>TASKS TRACKER</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoginPage: false,
    };
  },
  created() {
    // Check if current route is login page
    this.isLoginPage = this.$route.path === '/login';
    // Listen to route changes to update isLoginPage status
    this.$router.beforeEach((to, from, next) => {
      this.isLoginPage = to.path === '/login';
      next();
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

header h1 {
  margin: 0;
}

.button {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button {
  background-color: #e0e0e0;
}
</style>
