<template>
  <div class="space-y-1">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-secondary-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
      
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="suffix" />
      </div>
    </div>
    
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-secondary-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const inputClasses = computed(() => {
  const baseClasses = 'block w-full border rounded-md shadow-sm focus:outline-none transition-colors duration-200'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    // keep 'lg' key for typing compatibility but value matches desktop breakpoint styling
    lg: 'px-4 py-3 text-base',
    desktop: 'px-4 py-3 text-base'
  }
  
  const stateClasses = props.error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500'
  
  const disabledClasses = props.disabled
    ? 'bg-secondary-50 text-secondary-500 cursor-not-allowed'
    : 'bg-white'
  
  const slots = useSlots()
  const iconPadding = slots.icon ? 'pl-10' : ''
  const suffixPadding = slots.suffix ? 'pr-10' : ''
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    disabledClasses,
    iconPadding,
    suffixPadding,
    'focus:ring-1'
  ].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script>
