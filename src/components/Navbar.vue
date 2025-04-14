<template>
<div id="nav">
    <nav>
          <RouterLink to="/"  id="url-logo">
            <img :src="logo" alt="alt" id="logo">
          </RouterLink>
          
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/requests">Requests</RouterLink>
        </div>
    </nav>
</div>

   

</template>

<script setup>
  import logo from '@/assets/img/logo.png'

</script>

<style scoped>
#nav {
  background-color: #2F2F2F;
  border-bottom: 1px solid #2F2F2F;
  padding: 8px 30px;
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  box-sizing: border-box; 
  position: relative; 
  overflow: hidden; 
}

nav {
  width: 100%;
  max-width: 100%; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; 
}

.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  white-space: nowrap; 
}

#logo {
  width: 70px;
  height: auto;
  flex-shrink: 0; 
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  padding: 20px;
  text-decoration: none;
  transition: 0.5s;
  flex-shrink: 0; 
}

#nav a:hover {
  color: #FFB82A;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 10px;
  }
  
  #nav a {
    padding: 20px 10px; 
  }
}

@media (max-width: 480px) {
  #nav {
    padding: 8px 15px; 
  }
  
  .nav-links {
    position: static;
    transform: none;
    left: auto;
    margin: 0 auto; 
  }
}

</style>
