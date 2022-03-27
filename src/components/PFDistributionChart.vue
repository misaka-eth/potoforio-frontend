<template>
  <DoughnutChart :chartData="distributionData" />
</template>

<script>
import { computed, defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useCoreStore } from "@/stores/core";

Chart.register(...registerables);

export default defineComponent({
  name: "PFDistributionChart",
  components: { DoughnutChart },
  setup() {
    const coreStore = useCoreStore();

    const distributionData = computed(() => ({
      labels: coreStore.getDistributionData.labels,
      datasets: [
        {
          data: coreStore.getDistributionData.data,
          backgroundColor: [
            "#808080",
            "#909090",
            "#303030",
            "#404040",
            "#555555",
            "#606060",
            "#707070",
          ],
        },
      ],
    }));

    return { distributionData };
  },
});
</script>