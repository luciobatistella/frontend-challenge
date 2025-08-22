import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '../BaseCard.vue'

describe('BaseCard', () => {
  it('renders default slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: '<p>Card content</p>'
      }
    })
    expect(wrapper.html()).toContain('<p>Card content</p>')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        header: '<h2>Card Header</h2>',
        default: '<p>Card content</p>'
      }
    })
    expect(wrapper.html()).toContain('<h2>Card Header</h2>')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        footer: '<div>Card Footer</div>',
        default: '<p>Card content</p>'
      }
    })
    expect(wrapper.html()).toContain('<div>Card Footer</div>')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Content'
      }
    })
    expect(wrapper.classes()).toContain('shadow-sm')
    expect(wrapper.classes()).toContain('border')
  })

  it('applies elevated variant classes', () => {
    const wrapper = mount(BaseCard, {
      props: {
        variant: 'elevated'
      },
      slots: {
        default: 'Content'
      }
    })
    expect(wrapper.classes()).toContain('shadow-lg')
  })

  it('applies hover classes when hover prop is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hover: true
      },
      slots: {
        default: 'Content'
      }
    })
    expect(wrapper.classes()).toContain('hover:shadow-md')
  })

  it('applies padding to body when padding prop is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        padding: true
      },
      slots: {
        default: 'Content'
      }
    })
    const bodyDiv = wrapper.find('div').findAll('div')[0]
    expect(bodyDiv.classes()).toContain('p-4')
  })

  it('does not apply padding when padding prop is false', () => {
    const wrapper = mount(BaseCard, {
      props: {
        padding: false
      },
      slots: {
        default: 'Content'
      }
    })
    const bodyDiv = wrapper.find('div').findAll('div')[0]
    expect(bodyDiv.classes()).not.toContain('p-6')
  })
})
