<script setup lang="ts">
import ContactItem from './ContactItem.vue'
const props = defineProps<{ address: any }>()
</script>

<template>
    <div class="border p-4 bg-white">
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-base">{{ props.address.label }}</h3>

            <span v-if="props.address.code" class="bg-blue-100 px-2 py-1 rounded text-xs text-blue-600 font-bold">#{{
                props.address.code }}</span>
        </div>

        <div class="space-y-2 text-sm">
            <ContactItem type="address" :value="props.address.address" />

            <div class="pt-2 border-t space-y-1">
                <p>
                    <ContactItem type="name" :value="props.address.contact.name" />
                </p>
                <p>
                    <ContactItem type="mail" :value="props.address.contact.email" />
                </p>
                <p>
                    <ContactItem type="phone" :value="props.address.contact.phone" />
                </p>
                <p>
                    <ContactItem type="fax" :value="props.address.contact.fax" />
                </p>
            </div>
        </div>
    </div>
</template>
