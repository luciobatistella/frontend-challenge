import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

describe('BaseInput', () => {
  it('renders input element', () => {
    const wrapper = mount(BaseInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Test Label'
      }
    })
    expect(wrapper.find('label').text()).toContain('Test Label')
  })

  it('shows required asterisk when required', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Test Label',
        required: true
      }
    })
    expect(wrapper.find('label').html()).toContain('*')
  })

  it('applies correct input type', () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'email'
      }
    })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('sets placeholder correctly', () => {
    const wrapper = mount(BaseInput, {
      props: {
        placeholder: 'Enter text...'
      }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text...')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')
    
    await input.setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  it('displays error message when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        error: 'This field is required'
      }
    })
    expect(wrapper.text()).toContain('This field is required')
    expect(wrapper.find('p').classes()).toContain('text-red-600')
  })

  it('displays hint message when hint prop is provided and no error', () => {
    const wrapper = mount(BaseInput, {
      props: {
        hint: 'This is a helpful hint'
      }
    })
    expect(wrapper.text()).toContain('This is a helpful hint')
    expect(wrapper.find('p').classes()).toContain('text-secondary-500')
  })

  it('applies error styles when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        error: 'Error message'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-red-300')
  })

  it('applies disabled styles when disabled', () => {
    const wrapper = mount(BaseInput, {
      props: {
        disabled: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.classes()).toContain('bg-secondary-50')
  })

  it('renders icon slot when provided', () => {
    const wrapper = mount(BaseInput, {
      slots: {
        icon: '<svg data-testid="icon">Icon</svg>'
      }
    })
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
  })

  it('renders suffix slot when provided', () => {
    const wrapper = mount(BaseInput, {
      slots: {
        suffix: '<button data-testid="suffix">Suffix</button>'
      }
    })
    expect(wrapper.find('[data-testid="suffix"]').exists()).toBe(true)
  })

  it('applies correct size classes', () => {
    const wrapper = mount(BaseInput, {
      props: {
        size: 'lg'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('px-4')
    expect(input.classes()).toContain('py-3')
  })
})
