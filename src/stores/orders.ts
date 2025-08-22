import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchOrderList, fetchOrderDetail, type OrderDetail } from '@/services/orders'

export const useOrdersStore = defineStore('orders', () => {
  const list = ref<{ header: OrderDetail['header'] }[]>([])
  const detail = ref<OrderDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadList() {
    loading.value = true
    error.value = null
    try {
      list.value = await fetchOrderList()
    } catch (e: any) {
      error.value = e?.message || 'Failed to load orders'
    } finally {
      loading.value = false
    }
  }

  async function loadDetail() {
    loading.value = true
    error.value = null
    try {
      detail.value = await fetchOrderDetail()
    } catch (e: any) {
      error.value = e?.message || 'Failed to load order detail'
    } finally {
      loading.value = false
    }
  }

  return { list, detail, loading, error, loadList, loadDetail }
})

