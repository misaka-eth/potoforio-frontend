<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted, ref } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadBlockchains();
});

const hide_limit = ref(localStorage.hide_limit || 10);

function set_new_balance_limit(data) {
    localStorage.hide_limit = data.target.value
    hide_limit.value = data.target.value
}
</script>

<template>
  <v-row>
    <v-col>
      <v-card elevation="1">
        <v-card-title>
            Hide small blances from dashboard
        </v-card-title>
        <v-card-text>
          <v-text-field label="hide values less than" :model-value="hide_limit" @keyup="set_new_balance_limit" prefix="$"></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.streach {
  width: 50%;
}

a {
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 0;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>