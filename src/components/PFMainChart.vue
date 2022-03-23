<script setup>
import { ref, watch, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import { useCoreStore } from "@/stores/core";
import "chartjs-adapter-moment";

Chart.register(...registerables);

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadHistoryChart().then((data) => {
    const labels = coreStore.getAssetsBalance.map((el) => el.name);
    const values = coreStore.getAssetsBalance.map(
      (el) => el.balance_with_decimals * el.last_price
    );

    new Chart(document.getElementById("doughnut-chart").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Balance distribution ($)",
            backgroundColor: [
              "#808080",
              "#909090",
              "#303030",
              "#404040",
              "#555555",
              "#606060",
              "#707070",
            ],
            data: values,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

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
            tension: 1,
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
  <v-row>
    <v-col md="9" sm="12">
      <v-card>
        <v-card-title>Balance history</v-card-title>
        <v-card-text>
          <canvas id="myChart"></canvas>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col md="3" sm="12">
      <v-card>
        <v-card-title>Balance distribution</v-card-title>
        <v-card-text>
          <canvas id="doughnut-chart"></canvas>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

