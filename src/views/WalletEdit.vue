<script setup>

import { ref } from 'vue'
import { useAssetsStore } from '@/stores/assets'
import { useRouter, useRoute } from 'vue-router'

const assets = useAssetsStore()
const router = useRouter()
const route = useRoute()

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

assets.getWallet(route.params.id).then(response => {
    form.value.name.value = response.data.name
    form.value.address.value = response.data.address
})


async function process_form() {
    assets.updateWallet(route.params.id, form.value.name.value, form.value.address.value).then((response) => {
        assets.loadAssets()
        router.go(-1)
    }).catch(
        error => {
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
    <v-card-title>
        <a><v-icon @click="$router.go(-1)" size="24px" style="margin-right: 10px;">mdi-arrow-left-circle</v-icon></a>
        Edit wallet with id{{ $route.params.id }}
    </v-card-title>
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