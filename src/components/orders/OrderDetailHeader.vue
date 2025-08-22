<script setup lang="ts">
import ContactItem from './ContactItem.vue'

const props = defineProps<{ order: any; formatDate: Function; formatCurrency: Function }>()

const getStatusClass = (status: string) => {
    switch ((status || '').toLowerCase()) {
        case 'need to confirm':
            return 'bg-yellow-100 text-yellow-800'
        case 'confirmed':
            return 'bg-green-100 text-green-800'
        case 'processing':
            return 'bg-blue-100 text-blue-800'
        case 'shipped':
            return 'bg-purple-100 text-purple-800'
        default:
            return 'bg-gray-100 text-gray-900'
    }
}
</script>

<template>
    <div v-if="props.order" class="w-full flex items-center justify-between">
        <div>
            <div class="flex items-center gap-4">
                <div class="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold">Pre-Order</div>
                <div>
                    <div class="text-2xl font-bold">Order {{ props.order.header.number }}</div>
                    <div class="text-sm text-gray-600">#ME{{ props.order.header.serial }}</div>
                </div>
            </div>

            <div class="mt-3 text-ui-sm">
                <div class="font-medium">{{ props.order.header.buyer }}</div>
                <div class="mt-1">{{ props.order.header.contact.name }}</div>
                <div class="mt-2 flex items-center gap-4">
                    <ContactItem type="mail" :value="props.order.header.contact.email"
                        :name="props.order.header.contact.name" />
                    <ContactItem type="phone" :value="props.order.header.contact.phone"
                        :name="props.order.header.contact.name" />
                    <ContactItem type="fax" :value="props.order.header.contact.fax"
                        :name="props.order.header.contact.name" />
                </div>
            </div>
        </div>

        <div class="text-right">
            <div class="text-2xl font-bold">{{ props.formatCurrency(props.order.header.price,
                props.order.header.currency) }}</div>
            <div class="text-sm text-gray-600 flex items-center gap-2">
                <ContactItem type="calendar" :value="props.formatDate(props.order.header.createdAt)" />
                <span>Created at {{ props.formatDate(props.order.header.createdAt) }}</span>
            </div>
            <div class="mt-2">
                <span
                    :class="getStatusClass(props.order.header.status) + ' px-4 py-2 rounded-full text-sm font-medium'">{{
                        props.order.header.status }}</span>
            </div>
        </div>
    </div>
</template>
