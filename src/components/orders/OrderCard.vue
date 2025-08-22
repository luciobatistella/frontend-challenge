<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import ContactItem from './ContactItem.vue'

interface Order {
    header: {
        number: number
        serial: number
        buyer: string
        price: number
        currency: string
        createdAt: string
        status: string
        contact: {
            name: string
            email: string
            phone: string
            fax: string
        }
    }
}

const props = defineProps<{ order: Order, stickyMobile?: boolean }>()
const attrs = useAttrs()

const panelClass = computed(() => {
    const base = 'w-full sm:w-48 bg-primary-600 text-white px-6 py-3 rounded-t-xl sm:rounded-t-none sm:rounded-r-xl flex items-center justify-between'
    if (props.stickyMobile) return base + ' sticky top-4 z-10 self-start'
    return base
})

const formatDate = (dateString: string) => {
    if (typeof attrs.formatDate === 'function') return (attrs.formatDate as Function)(dateString)
    const d = new Date(dateString)
    return d.toLocaleString()
}

const formatCurrency = (amount: number, currency: string) => {
    if (typeof attrs.formatCurrency === 'function') return (attrs.formatCurrency as Function)(amount, currency)
    try {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
        }
        // fallback: local format BR for others
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency || 'BRL' }).format(amount)
    } catch (e) {
        return `${currency} ${amount}`
    }
}
</script>

<template>
    <div class="flex flex-col sm:flex-row bg-white overflow-hidden cursor-pointer hover:bg-primary-50 mb-1 border border-gray-200 rounded-xl"
        role="button" tabindex="0" @keydown.enter="$emit('click')" @keydown.space.prevent="$emit('click')">
        <div :class="panelClass" aria-hidden="true">
            <div>
                <h3 class="text-sm leading-none mb-0">Pre-Order</h3>
                <h1 class="font-bold leading-none tracking-wide text-2xl mb-0">{{ props.order.header.number }}</h1>
                <span class="hidden sm:block">
                    <h4 class="text-sm opacity-90 mt-0 mb-0 leading-none">#ME{{ props.order.header.serial }}</h4>
                </span>
            </div>
            <div class="sm:hidden flex flex-col items-center justify-center text-center">
                <div class="text-xl font-semibold tracking-tight">{{ formatCurrency(props.order.header.price,
                    props.order.header.currency) }}</div>
                <div class="inline-block bg-green-100 text-green-800 text-xs px-1 py-1 rounded-md">{{
                    props.order.header.status }}</div>
            </div>
        </div>

        <div class="flex-1 px-4 py-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
                <div class="text-base font-semibold">{{ props.order.header.buyer }}</div>
                <div class="text-base font-semibold text-right hidden sm:block">{{
                    formatCurrency(props.order.header.price,
                        props.order.header.currency) }}</div>
            </div>

            <div class="mt-1 flex items-center justify-between text-sm text-gray-700">
                <div class="flex items-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="ml-2">{{ props.order.header.contact.name }}</span>
                </div>
                <div class="hidden sm:block text-right">
                    <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">{{
                        props.order.header.status }}</span>
                </div>
            </div>

            <div class="mt-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600">
                <div class="flex-1 min-w-0">
                    <!-- email full width on mobile, inline with phone/fax on md+ -->
                    <div class="w-full md:w-auto min-w-0 md:flex-1">
                        <ContactItem type="mail" :value="props.order.header.contact.email" />
                    </div>

                    <!-- phone + fax side-by-side; on md+ they appear inline next to email -->
                    <div class="flex items-center gap-2 mt-2 md:mt-0">
                        <ContactItem type="phone" :value="props.order.header.contact.phone" />
                        <ContactItem type="fax" :value="props.order.header.contact.fax" />
                    </div>

                    <!-- created at: always on its own final row on mobile -->
                    <div class="w-full mt-2 md:hidden md:text-center flex items-center gap-2">
                        <ContactItem type="calendar" :value="''" />
                        <span>Created at {{ formatDate(props.order.header.createdAt) }}</span>
                    </div>
                </div>

                <!-- created at on md+ aligned to right -->
                <div class="hidden md:block text-xs text-gray-500 whitespace-nowrap text-right">
                    <span class="inline-flex items-center gap-1">
                        <ContactItem type="calendar" :value="''" />
                        <span>Created at {{ formatDate(props.order.header.createdAt) }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
