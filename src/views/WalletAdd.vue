<script setup>

import { ref } from 'vue'
import { useAssetsStore } from '@/stores/assets'
import { useRouter, useRoute } from 'vue-router'

const assets = useAssetsStore()


const form = ref({
    name: {
        'value': '',
        'errorMessages': []
    },
    address: {
        'value': '',
        'errorMessages': []
    }
})

let error_text = ref("")

const router = useRouter()

async function process_form () {
    assets.addWallet(form.value.name.value, form.value.address.value).then((response) => {
        assets.loadAssets()
        router.go(-1)
    }).catch(
        error => {
            error_text.value = error.response.data
            for (let key of Object.keys(error.response.data))
                 if (key in form.value){
                    form.value[key].errorMessages = error.response.data[key]
            }
        }
    )
}
</script>

<template>
  <v-card class="mx-auto" max-width="600px">
    <v-card-title>Add new wallet</v-card-title>
    <v-card-text class="text--primary">
        <v-form>
            <v-text-field label="Name" v-model="form.name.value" :error="!form.name.errorMessages" :error-messages="form.name.errorMessages" @focus="form.name.errorMessages=[]"></v-text-field>
            <v-text-field label="Address" v-model="form.address.value" :error="!form.address.errorMessages" :error-messages="form.address.errorMessages" @focus="form.address.errorMessages=[]"></v-text-field>
            <v-btn class="mr-4" color="primary" type="submit" @click="process_form">Submit</v-btn>
        </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>