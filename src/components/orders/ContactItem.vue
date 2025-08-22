<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type: 'mail' | 'phone' | 'fax' | 'name' | 'cnpj' | 'address' | 'read' | 'calendar'
    value: string
    name?: string
}

const props = defineProps<Props>()

const showLink = computed(() => ['mail', 'phone'].includes(props.type))

const href = computed(() => {
    if (!props.value) return '#'
    if (props.type === 'mail') return `mailto:${props.value}`
    if (props.type === 'phone') return `tel:${props.value}`
    if (props.type === 'fax') return `fax:${props.value}`
    return '#'
})

const ariaLabel = computed(() => {
    if (props.type === 'mail') return `Send email to ${props.value}`
    if (props.type === 'phone') return `Call ${props.value}`
    if (props.type === 'fax') return `Fax ${props.value}`
    if (props.type === 'name') return `Name ${props.value}`
    if (props.type === 'cnpj') return `CNPJ ${props.value}`
    if (props.type === 'address') return `Address ${props.value}`
    if (props.type === 'read') return `Mark as read ${props.value}`
    if (props.type === 'calendar') return `Created at ${props.value}`
    return String(props.value)
})
</script>

<template>
    <component :is="showLink ? 'a' : 'div'" :href="showLink ? href : undefined" :aria-label="ariaLabel"
        class="flex items-center gap-2 underline-offset-2 decoration-1 hover:text-brand-600 transition-colors">
        <span aria-hidden="true">
            <svg v-if="props.type === 'mail'" class="w-4 h-4 align-middle" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <svg v-else-if="props.type === 'phone'" class="w-4 h-4 align-middle" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>

            <svg v-else-if="props.type === 'fax'" class="w-4 h-4 align-middle" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
            </svg>

            <svg v-else-if="props.type === 'name'" class="w-4 h-4 align-middle" viewBox="0 0 24 24" fill="none"
                stroke="currentColor">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                <circle cx="12" cy="7" r="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
            </svg>

            <svg v-else-if="props.type === 'cnpj'" class="w-4 h-4 align-middle" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2"></rect>
                <circle cx="8.5" cy="10.5" r="2"></circle>
                <path d="M12.5 9h6M12.5 12h6M12.5 15h4"></path>
            </svg>

            <svg v-else-if="props.type === 'address'" class="w-4 h-4 align-middle" viewBox="0 0 24 24" fill="none"
                stroke="currentColor">
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke-width="2"></path>
                <circle cx="12" cy="9" r="2" stroke-width="2"></circle>
            </svg>

            <svg v-else-if="props.type === 'read'" class="w-4 h-4 align-middle" viewBox="0 0 24 24" fill="none"
                stroke="currentColor">
                <line id="primary" x1="13.22" y1="16.5" x2="21" y2="7.5" stroke="primary">
                </line>
                <polyline id="primary-2" data-name="primary" points="3 11.88 7 16.5 14.78 7.5" stroke="primary">
                </polyline>
            </svg>


            <svg v-else-if="props.type === 'calendar'" class="w-4 h-4 align-middle" viewBox="0 0 24 24" fill="none"
                stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="2"></rect>
                <path d="M16 2v4M8 2v4M3 10h18" stroke-width="2"></path>
            </svg>
        </span>

        <span v-if="props.value" class="truncate">{{ props.name ? props.name + ' (' + props.value + ')' : props.value
            }}</span>
    </component>
</template>
