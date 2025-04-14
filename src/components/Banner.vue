<template>

    <div id="main-banner">
     
    </div>
    <p>It's not just a burger – it's an explosion of flavor made with passion!</p>

</template>

<script setup>

</script>

<style scoped>

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#main-banner {
    background-image: url('src/assets/img/burger.jpeg');
    background-position: 0 -250px;
    background-size: cover;
    background-repeat: no-repeat;
    height: calc(900px + 40px);
    width: calc(100% + 40px); 
    margin: -20px;
    filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: -1;
}

#main-banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

p {
    position: absolute;
    top: 60%; 
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    white-space: nowrap;
}


</style>




