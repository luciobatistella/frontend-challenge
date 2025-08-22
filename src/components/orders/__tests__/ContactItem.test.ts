import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactItem from '../ContactItem.vue'

describe('ContactItem', () => {
  it('renderiza ícone de calendário quando type="calendar"', () => {
    const wrapper = mount(ContactItem, {
      props: { type: 'calendar', value: '' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('não cria link para fax', () => {
    const wrapper = mount(ContactItem, {
      props: { type: 'fax', value: '123' }
    })
    expect(wrapper.find('a').exists()).toBe(false)
  })
})

