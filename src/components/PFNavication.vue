<template>
    <v-navigation-drawer expand-on-hover rail floating permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-circle-multiple-outline" title="Assets" value="assets" :to="{path: '/'}"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>