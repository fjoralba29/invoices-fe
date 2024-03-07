<template>
  <header class="top-nav">
    <div class="logo">
      <h1>Invoices</h1>
    </div>
    <nav>
       <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    const isToken = localStorage.getItem('token')
    console.log(isToken)
    this.isLoggedIn = isToken
   
  },

  methods: {
    logout() {
      localStorage.removeItem('token'); 
      localStorage.removeItem('id');
      this.isLoggedIn = false
      this.$router.push('/log-in');
    },
   
  },
  
};
</script>

<style scoped>
.top-nav {
  background-color: #102E4A;
  color: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
}

.logo {
  flex: 1;
  color: #fff;
  font-size: 1.5rem;
}

nav {
  display: flex;
  gap: 1rem;
}

button.logout-btn {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.logout-btn:hover {
  background-color: #c82333;
}
</style>
