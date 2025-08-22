import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useOrdersStore } from '@/stores/orders'

vi.mock('@/services/orders', async () => {
  const actual = await vi.importActual<any>('@/services/orders')
  return {
    ...actual,
    fetchOrderList: vi.fn(async () => ([
      { header: { number: 1, serial: 1, buyer: 'A', price: 100, currency: 'USD', createdAt: '2020-01-01T00:00:00.000Z', status: 'ok', contact: { name: 'X', email: 'x@x.com', phone: '1', fax: '2' } } },
    ])),
  }
})

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('carrega e exibe a lista de pedidos', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
      },
    })

    const store = useOrdersStore()
    await store.loadList()

    expect(store.list.length).toBeGreaterThan(0)
    expect(wrapper.html()).toContain('Pre-Order')
  })
})

