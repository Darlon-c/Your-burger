<template>
  <main class="container">
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="name">Client name</label>
          <input type="text" id="name" name="name" v-model="name" placeholder="Enter your name">
        </div>

        <div class="input-container">
          <label for="bread">Choose the bread:</label>
          <select v-model="bread" :disabled="isLoading || error" >
            <option value="" disabled>Select a bread 🥖</option>
            <option v-for="item in breads" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
          </select>
        </div>

        <div class="input-container">
          <label for="meat">Select the meat for your burger:</label>
          <select name="meat" id="meat" v-model="meat">
            <option value="">Select the type of meat 🥩</option>
            <option v-for="item in meats" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
          </select>
        </div>
      
        <div id="options-container" class="input-container">
          <label id="options-title" for="options">Select the options:</label>
          <div class="checkbox-container"  v-for="item in optionalItems" :key="item.id" >
            <input type="checkbox" name="options" v-model="options" :value="item.tipo">
            <span>{{item.tipo}}</span>
          </div>
        </div>
        
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Make my burger!">
        </div>
      </form>
  </main>

</template>

<script setup>

import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

const name = ref('')
const bread = ref('')
const meat = ref('')
const options = ref([])

const breads = ref([])
const meats = ref([])
const optionalItems = ref([])
const isLoading = ref(false)
const error = ref(null)


async function getIngredients() {

  try {
    const req = await fetch('http://localhost:3000/ingredientes')
    if (!req.ok) throw new Error('Não foi possível obter os ingredientes')
    const data = await req.json()
    
    breads.value = data.breads || []
    meats.value = data.meats || []
    optionalItems.value = data.optionalItems || []
  } catch (err) {
    console.error("Erro na API:", err)
  } finally {
    isLoading.value = false
  }
}

async function createBurger(e) {
    e.preventDefault()
    
    try {
      
    const data = {
      nome: name.value,
      carne: meat.value,
      pao: bread.value,
      opcionais: Array.from(options.value),
      status: "Solicitado"
    };

    const req = await fetch('http://localhost:3000/burgers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!req.ok) throw new Error('Erro ao criar pedido');

    const res = await req.json(); 
    const pedidoId = res.id;

    await Swal.fire({
      title: 'Pedido Criado!',
      html: `Seu pedido <strong>#${pedidoId}</strong> foi registrado com sucesso.`,
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        container: 'swal-container' 
  }
});

    name.value = '';
    bread.value = '';
    meat.value = '';
    options.value = [];

  } catch (err) {
    console.error(err);
   
    await Swal.fire({
      title: 'Erro!',
      text: 'Não foi possível criar o pedido. Tente novamente.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

onMounted(() => {
  getIngredients()
})

</script>


<style scoped>

:root {
  --primary-color: #222;
  --secondary-color: #FAF6F2;
  --form-bg-color: #fffdf8;
  --text-color: #0D0D0D;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}



.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
  background-color: var(--secondary-color);
}

.form {
  background-color: var(--form-bg-color);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

#burger-form {
  background: var(--form-bg-color);
  border-radius: 12px;
}


#options-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-auto-rows: auto;
  gap: 1rem; 
  margin-bottom: 2rem;
}


#options-title {
  grid-column: 1 / -1; 
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: var(--text-color);
}


.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: var(--transition);
}

.checkbox-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.checkbox-container input {
  width: auto;
  margin-right: 0.75rem;
  accent-color: var(--primary-color);
  cursor: pointer;
}

.checkbox-container span {
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
}

label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-left: 4px solid var(--text-color);
  font-size: 1rem;
}

input,
select {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  transition: var(--transition);
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(34, 34, 34, 0.1);
}

.submit-btn {
  background-color: #222; 
  color: white;
  font-weight: 600;
  border: 2px solid;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  margin-top: 1.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}


.submit-btn:hover {
  background-color: transparent;
  color: var(--primary-color);
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }
  
  .form {
    padding: 1.5rem;
  }
  

  #options-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
    min-height: calc(100vh - 80px);
  }
  
  .form {
    padding: 1.25rem;
  }
  
  label {
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
  }
  
 
  #options-container {
    grid-template-columns: 1fr;
  }
}
</style>
