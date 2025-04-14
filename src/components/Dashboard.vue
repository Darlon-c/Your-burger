<template>
    <div id="burger-table">
        <table class="order">
            <tr class="header">
                <th class="order-id">#:</th>
                <th>Client:</th>
                <th>Bread:</th>
                <th>Meat:</th>
                <th>Optional:</th>
                <th>Action:</th>
            </tr>

            <tr class="order-info" v-for="item in burgers" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.nome}}</td>
                <td>{{item.pao }}</td>
                <td>{{item.carne}}</td>
                <td>
                    <ul v-for="(option, index) in item.opcionais" :key="index">
                        <li>{{option}}</li>
                        
                    </ul>
                </td>
                <td>
                    <select name="status" class="status">
                        <option v-for="s in status" :key="s.id" value="s.tipo" :selected="burgerId.status == s.tipo">{{ s.tipo}}</option>
                    </select>
                    <button id="delete-btn" @click="deleteBurger(item.id)">Cancel</button>
                </td>
            </tr>     
        </table>
    </div>
</template>


<script setup>
    import { onMounted, ref } from 'vue';
    import Swal from 'sweetalert2';

    const burgers = ref();
    const burgerId = ref('');
    const status = ref([]);

    async function getPedidos() {
        const req = await fetch('http://localhost:3000/burgers');
        const data = await req.json();
        burgers.value = data;


        getStatus()
    }

    async function getStatus() {
        const req = await fetch('http://localhost:3000/status');
        const data = await req.json();
        status.value = data;
       
    }

    async function deleteBurger(id) {
        console.log(id)
    try {

        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, cancelar pedido!',
            customClass: {
            popup: 'custom-swal-popup',
            icon: 'custom-swal-icon',
            container: 'custom-swal-container'
            },
            scrollbarPadding: false
});

        if (!result.isConfirmed) {
            return;
        }
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
            method: 'DELETE'
        });

        if (!req.ok) {
            throw new Error(`Erro HTTP: ${req.status}`);
        }

        await Swal.fire({
            title: 'Cancelado!',
            text: `Pedido #${id} foi cancelado.`,
            icon: 'success'
        });

        
        const res = await req.json(); 
    

        getPedidos(); 
    } catch (error) {
        console.error("Falha ao deletar:", error);
    }
}



    onMounted(() => {
        getPedidos();
    })
</script>


<style scoped>

    #burger-table {
        max-width: 1200px;
        margin: 0 auto;
    }

    #delete-btn {
        padding: 15px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        margin-left: 10px;
        background-color: #222;
        color: #eee;
        transition: 0.5s;
    }

    #delete-btn:hover {
        color: #222;
        background-color: #fff;
        border: 1px solid;
    }

    .order {
        width: 100%;
        border-collapse: collapse;
        margin-top: 50px;
    }

    .order tr {
        border-bottom: 1px solid #ccc;
    }

    .order .header th {
        text-align: left;
        padding: 20px;
    }

    .order .order-info td {
        padding: 20px;
    }

    .order .order-info .status {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        width: 200px;
    }

    .order .order-info  {
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
        border-bottom:  1px solid #ccc;
    }

</style>





