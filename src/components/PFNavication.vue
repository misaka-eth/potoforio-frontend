<template>
    <v-navigation-drawer expand-on-hover rail floating permanent>
        <v-list nav>
          <v-list-item prepend-icon="mdi-circle-multiple-outline" title="Assets" value="assets" :to="{path: '/'}"></v-list-item>
          <v-list-item prepend-icon="mdi-wallet" title="Wallets" value="wallets" :to="{path: '/wallets'}"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>