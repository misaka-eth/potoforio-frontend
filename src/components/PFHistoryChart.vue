<template>
  <LineChart :chartData="historyData" :options="options" />
</template>

<script>
import "chartjs-adapter-moment";
import { computed, defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useCoreStore } from "@/stores/core";

Chart.register(...registerables);

export default defineComponent({
  name: "PFHistoryChart",
  components: { LineChart },
  setup() {
    const coreStore = useCoreStore();

    const options = {
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
    };

    const historyData = computed(() => ({
      datasets: [
        {
          data: coreStore.history,
          label: "Total balance in USD",
          borderColor: "rgb(75, 192, 192)",
          fill: true,
          tension: 1,
        },
      ],
    }));

    return { coreStore, historyData, options };
  },
  mounted: function () {
    this.coreStore.loadHistory();
    setInterval(() => this.coreStore.loadHistory(), 60000);
  },
});
</script>