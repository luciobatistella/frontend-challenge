<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-secondary-200">
      <slot name="header" />
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: true,
  hover: false
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white overflow-hidden'

  const variantClasses = {
    default: 'shadow-sm border border-secondary-200',
    elevated: 'shadow-lg',
    outlined: 'border-2 border-secondary-200'
  }

  const hoverClasses = props.hover ? 'hover:shadow-md transition-shadow duration-200' : ''

  return [
    baseClasses,
    variantClasses[props.variant],
    hoverClasses
  ].filter(Boolean).join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'p-4' : ''
})
</script>
