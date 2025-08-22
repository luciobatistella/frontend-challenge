<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import OrderCard from '../components/orders/OrderCard.vue'
import ContactItem from '../components/orders/ContactItem.vue'
import SupplierCard from '../components/orders/SupplierCard.vue'
import AddressCard from '../components/orders/AddressCard.vue'
import { useOrdersStore } from '@/stores/orders'
import { formatDate, formatCurrency } from '@/utils/format'



const route = useRoute()
const router = useRouter()
const store = useOrdersStore()
const order = computed(() => store.detail)
const loading = computed(() => store.loading)



const goBack = () => {
  router.push('/')
}



onMounted(() => {
  store.loadDetail()
})

// controls addresses collapse state
const addressesOpen = ref(true)
</script>

<template>
  <!-- Header -->
  <div class="bg-blue-600 shadow">
    <div class="px-4 sm:px-4 desktop:px-8 py-3 container">
      <div class="relative">
        <div class="flex items-center justify-between">
          <!-- left: fixed-width wrapper for back button -->
          <div class="w-12 flex items-center justify-center">
            <div class="flex items-center rounded-full text-blue-500 p-1">
              <BaseButton variant="primary" @click="goBack">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </BaseButton>
            </div>
          </div>

          <!-- right spacer: same width as left to visually balance center -->
          <div class="w-12" aria-hidden="true"></div>
        </div>

        <!-- absolute centered box, vertically centered within header -->
        <div
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
          ME#{{ order?.header?.serial ?? '—' }}
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="text-center py-12">
    <div class="inline-block animate-spin rounded-full h-8 w-8  border-blue-600"></div>
    <p class="mt-2 text-gray-600">Loading order details...</p>
  </div>

  <!-- Content -->
  <div v-else-if="order" class="container px-4 sm:px-6 desktop:px-8 py-8 bg-gray-50">
    <!-- Order Header -->

    <OrderCard :order="order" :formatDate="formatDate" :formatCurrency="formatCurrency" class="mb-6" />

    <!-- Supplier Information -->
    <BaseCard class="mb-6">
      <SupplierCard :supplier="order.supplier" :formatDate="formatDate" />
    </BaseCard>
    <!-- Addresses -->
    <div class="mb-3 flex items-center justify-between">
      <button @click="addressesOpen = !addressesOpen" :aria-expanded="addressesOpen" aria-label="Toggle addresses"
        class="flex items-center gap-3 text-2xl font-semibold text-gray-900 hover:text-gray-900">
        <svg
          :class="['w-6 h-6 transform transition-transform bg-blue-100 rounded-full p-1 text-blue-500', addressesOpen ? 'rotate-180' : 'rotate-0']"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span>Addresses</span>
      </button>
    </div>

    <div v-show="addressesOpen" class="grid grid-cols-1 desktop:grid-cols-3 gap-6">
      <AddressCard v-for="address in order.addresses" :key="address.label" :address="address" />
    </div>
  </div>

  <!-- Error State -->
  <div v-else class="text-center py-12">
    <p class="text-gray-600">Error loading order details.</p>
    <BaseButton class="mt-4" @click="goBack">Back to list</BaseButton>
  </div>
</template>
