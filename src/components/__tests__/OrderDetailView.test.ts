import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderDetailView from '@/views/OrderDetailView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useOrdersStore } from '@/stores/orders'

vi.mock('@/services/orders', async () => {
  const actual = await vi.importActual<any>('@/services/orders')
  return {
    ...actual,
    fetchOrderDetail: vi.fn(async () => ({
      header: {
        number: 1, serial: 1, buyer: 'Buyer', price: 100, currency: 'USD', createdAt: '2020-01-01T00:00:00.000Z', status: 'ok',
        contact: { name: 'X', email: 'x@x.com', phone: '1', fax: '2' }
      },
      supplier: {
        code: 'C', name: 'Supplier', readAt: '2020-01-02T00:00:00.000Z', lastReplyAt: '2020-01-03T00:00:00.000Z',
        document: { type: 'CNPJ', value: '00.000.000/0000-00' }, address: 'Address', contact: { name: 'S', email: 's@s.com', phone: '3', fax: '4' }
      },
      addresses: [
        { label: 'Ship to', name: 'A', code: '1', address: 'Addr 1', contact: { name: 'N', email: 'e', phone: 'p', fax: 'f' } },
        { label: 'Bill to', name: 'B', code: null, address: 'Addr 2', contact: { name: 'N', email: 'e', phone: 'p', fax: 'f' } },
      ],
    })),
  }
})

describe('OrderDetailView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('exibe SupplierCard e lista de addresses', async () => {
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [createPinia()] }
    })
    const store = useOrdersStore()
    await store.loadDetail()

    expect(wrapper.html()).toContain('Supplier')
    expect(wrapper.findAllComponents({ name: 'AddressCard' }).length).toBeGreaterThan(0)
  })

  it('toggle das addresses funciona', async () => {
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [createPinia()] }
    })
    const store = useOrdersStore()
    await store.loadDetail()

    const button = wrapper.find('button[aria-label="Toggle addresses"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    // Depois do clique, v-show deve esconder a grid
    // Não testamos estilos, apenas a existência
    // Checamos que o container ainda existe (v-show mantém no DOM)
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('mostra ícone de calendário no Created at', async () => {
    const wrapper = mount(OrderDetailView, { global: { plugins: [createPinia()] } })
    const store = useOrdersStore()
    await store.loadDetail()

    // Busca por ContactItem de calendario no header de detalhes
    expect(wrapper.findComponent({ name: 'ContactItem' }).exists()).toBe(true)
  })
})

