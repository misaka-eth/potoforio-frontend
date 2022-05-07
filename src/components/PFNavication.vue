<template>
  <v-navigation-drawer expand-on-hover rail floating permanent>
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