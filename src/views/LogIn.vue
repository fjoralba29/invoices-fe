<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">*Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">*Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
      <h5>If you don't have an account, you can register here.</h5>
      <router-link to="/sign-up" class="login-btn">SignUp</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LogIn',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    showSuccessToast(message) {
      this.$toast.success(message);
    },
    showErrorToast(message) {
      this.$toast.error(message);
    },

    async login() {
      try {
        const userData = {email: this.email, password: this.password}

        const response = await axios.post('http://localhost:3000/login', userData);

        const token = response?.data?.token;
        const userId = response?.data?.userId;

        localStorage.setItem('token', token);
        localStorage.setItem('id', userId);

        this.showSuccessToast("Login success")

        this.$router.push('/');
      }
      catch (error) {
        console.error('Error during login:', error?.response?.data?.message);
        this.showErrorToast(error?.response?.data?.message)
      }
    },

    
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 16px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  max-width: 370px;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
