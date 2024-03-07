<template>
  <div class="signup">
    <h1>SignUp</h1>
    <form @submit.prevent="registerUser">
    <div>
      <label for="name">*Emër:</label>
      <input type="text" id="name" v-model="name" required>
    </div>
    <div>
      <label for="surname">*Mbiemër:</label>
      <input type="text" id="surname" v-model="surname" required>
    </div>
    <div>
      <label for="email">*Email:</label>
      <input type="email" id="email" v-model="email" required>
    </div>
    <div>
      <label for="password">*Fjalëkalim:</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div>
      <label for="phone">Numri telefonit:</label>
      <input type="tel" id="phone" v-model="phone">
    </div>
    <div>
      <label for="address">Adresa:</label>
      <input type="text" id="address" v-model="address">
    </div>
    <div>
      <label for="city">Qyteti:</label>
      <input type="text" id="city" v-model="city">
    </div>
    <button type="submit">Regjistrohu</button>
  </form>
      <div>
      <h5>Already have an account?</h5>
      <router-link to="/log-in" class="login-btn">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      userData: {
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: ''
      }
    };
  },
  methods: {
    showSuccessToast(message) {
      this.$toast.success(message);
    },
    showErrorToast(message) {
      this.$toast.error(message);
    },

     async registerUser() {
      try {

        const userData = { name: this.name, surname: this.surname, email: this.email, password: this.password, phone: this.phone, address: this.address, city: this.city}

        const response = await axios.post('http://localhost:3000/sign-up', userData);
        this.showSuccessToast(response?.data?.message); // Log response message
        this.$router.push('/log-in');
      } catch (error) {
        console.error('Error during registration:', error?.response?.data?.message);
        this.showErrorToast(error?.response?.data?.message)
      }
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: 16px auto;
  padding: 32px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin: 1rem;
}

label {
  display: block;
  margin: 0.5rem;
  text-align: left;
}

input[type="email"],
input[type="password"],
input[type="text"],
input[type="tel"] {
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
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
