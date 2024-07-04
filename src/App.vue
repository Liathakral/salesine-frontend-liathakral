<template>
  <div id="app">
    <header>
      <h1>TASKS TRACKER</h1>
      <router-link to="/login">Login</router-link>
            <router-link to="/signup">Signup</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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

header a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

header a:hover {
  background-color: #e0e0e0;
}
</style>
