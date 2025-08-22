<script setup lang="ts">
import ContactItem from './ContactItem.vue'
const props = defineProps<{ supplier: any; formatDate: Function }>()
</script>
<template>
    <div>
        <div class="grid grid-cols-4 gap-6 items-center">
            <h3>Supplier</h3>
            <ContactItem class="col-start-4 justify-self-end text-right text-sm text-blue-600" type="read"
                :value="props.formatDate(props.supplier.lastReplyAt)" />
        </div>

        <div class="grid grid-cols-1 desktop:grid-cols-1 gap-6 mt-2">
            <div class="space-y-2 text-sm">
                <h3 class="font-semibold mb-2">{{ props.supplier.name }} <span
                        class="bg-blue-100 px-2 py-1 rounded text-xs text-blue-600 font-bold"># {{ props.supplier.code
                        }}</span></h3>
                <ContactItem type="cnpj" :value="props.supplier.document.value" />
                <ContactItem type="address" :value="props.supplier.address" class="border-b pb-2" />
                <ContactItem type="name" :value="props.supplier.contact.name" />
                <ContactItem type="mail" :value="props.supplier.contact.email" />
                <ContactItem type="phone" :value="props.supplier.contact.phone" />
                <ContactItem type="fax" :value="props.supplier.contact.fax" />

            </div>
        </div>
    </div>
</template>
