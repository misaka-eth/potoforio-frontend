<script setup>
import { ref, watch, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import { useCoreStore } from "@/stores/core";
import "chartjs-adapter-moment";

Chart.register(...registerables);

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadHistoryChart().then((data) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Total balance in USD",
            data: data.data,
            borderColor: "rgb(75, 192, 192)",
            fill: true,
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        parsing: {
          xAxisKey: "timestamp",
          yAxisKey: "balance",
        },
        scales: {
          x: {
            type: "time",
            time: {
              format: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
              tooltipFormat: "yyyy-MM-dd HH:mm:ss",
              unit: "day",
              unitStepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(255, 255, 255)",
            },
          },
        },
      },
    });
  });
});
</script>

<template>
  <v-card>
    <v-card-text>
      <canvas id="myChart" height="100"></canvas>
    </v-card-text>
  </v-card>
</template>

