import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary variant classes by default', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.classes()).toContain('bg-primary-600')
  })

  it('applies secondary variant classes when specified', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary'
      },
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary-200')
  })

  it('applies correct size classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        size: 'lg'
      },
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.classes()).toContain('px-6')
    expect(wrapper.classes()).toContain('py-3')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Button'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true
      },
      slots: {
        default: 'Button'
      }
    })
    
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders as different tag when specified', () => {
    const wrapper = mount(BaseButton, {
      props: {
        tag: 'a'
      },
      slots: {
        default: 'Link'
      }
    })
    
    expect(wrapper.element.tagName).toBe('A')
  })
})
