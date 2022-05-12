<script setup>
import { useCoreStore } from "@/stores/core";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
const coreStore = useCoreStore();

const size = ref(window.innerWidth);

window.addEventListener('resize', function() {
	size.value = window.innerWidth;
});


const is_rail = computed(() => {
  return size.value > 600
})

</script>

<template>
  <v-navigation-drawer expand-on-hover floating :rail="is_rail" rail-width="56" v-model="coreStore.navigation">
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        :to="{ path: '/' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-wallet"
        title="Wallets"
        value="wallets"
        :to="{ path: '/wallets' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-circle-multiple-outline"
        title="Assets"
        value="Assets"
        :to="{ path: '/assets' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-image"
        title="NFTs"
        value="NFTs"
        :to="{ path: '/NFTs' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-link"
        title="Blockchains"
        value="blockchains"
        :to="{ path: '/blockchains' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cube-scan"
        title="Providers"
        value="providers"
        :to="{ path: '/providers' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog-outline"
        title="Settings"
        value="settings"
        :to="{ path: '/settings' }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>