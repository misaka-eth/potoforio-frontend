<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from "vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadProviders();
});


function calc_run_duration(run_info) {
    const start = new Date(run_info.start_timestamp)
    const end = new Date(run_info.end_timestamp)

    return end-start
}
</script>

<template>
  <v-row v-for="provider in coreStore.providers" :key="provider.id">
    <v-col>
      <v-card elevation="1">
        <v-card-title>
          <span>{{ provider.name }}</span>
        </v-card-title>
        <v-card-subtitle>{{ provider.path }}</v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-card elevation="12">
                            <v-card-text>
                                <div>Status: {{ provider.status }}</div>
                                <div>Configuration: {{ provider.configuration }}</div>
                                <div>Last run time: {{ provider.last_run.end_timestamp }}</div>
                                <div>Last run duration: {{ calc_run_duration(provider.last_run) }}ms</div>
                                <div>Last run error: {{ provider.last_run.error || "No error" }}</div>
                            </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
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
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
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