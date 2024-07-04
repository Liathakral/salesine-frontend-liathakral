import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TasksPage from "./pages/TasksPage";
const routes = [
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/tasks", component: TasksPage, meta: { requiresAuth: true } }, // Protected route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
