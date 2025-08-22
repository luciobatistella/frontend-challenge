<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import OrderCard from '../components/orders/OrderCard.vue'
import { useOrdersStore } from '@/stores/orders'
import { formatDate, formatCurrency } from '@/utils/format'



const router = useRouter()
const store = useOrdersStore()
const orders = computed(() => store.list)
const loading = computed(() => store.loading)



const viewOrder = (orderNumber: number) => {
  router.push(`/order/${orderNumber}`)
}


// helpers available in this component; pass via bindings to children when needed

onMounted(() => {
  store.loadList()
})


</script>

<template>
  <div v-if="loading" class="text-center py-12 container">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <p class="mt-2 text-gray-600">Loading orders...</p>
  </div>

  <div v-else class="container mx-auto p-4">
    <div v-for="order in orders" :key="order.header.number" @click="viewOrder(order.header.number)">
      <OrderCard :order="order" :formatDate="formatDate" :formatCurrency="formatCurrency" />
    </div>
  </div>
</template>
