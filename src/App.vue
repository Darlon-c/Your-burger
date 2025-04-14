<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';




</script>

<template>


 <Navbar :logo="logo_src" :alt="app_name"></Navbar>
 <RouterView></RouterView>
 <Footer></Footer>

</template>

<style>

body {
    background-color: #FAF6F2;     
}



* {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    max-width: 100vw;
    overflow-x: hidden;

}

.main-container {
    margin: 50px;
    min-height: 250px;
    
}
.swal-container,
.custom-swal-container {
  overflow: visible !important;
  max-width: none !important;
}

.swal2-popup,
.custom-swal-popup {
  overflow: visible !important;
  width: 32em !important;
  height: auto !important;
  max-width: 32em !important;
  padding: 2em !important;
}

.swal2-icon,
.custom-swal-icon {
  width: 5em !important;
  height: 5em !important;
  margin: 1.5em auto 0.6em !important;
  position: relative !important;
  overflow: visible !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom-swal-icon .swal2-icon-content {
  font-size: 3.75em !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.swal2-icon.swal2-warning {
  border-color: #f8bb86 !important;
  color: #f8bb86 !important;
}

body.swal2-shown {
  overflow: auto !important;
  padding-right: 0 !important;
}

h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
}




</style>
