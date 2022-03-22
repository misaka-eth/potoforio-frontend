<script setup>
import { useCoreStore } from "@/stores/core";
const coreStore = useCoreStore();

import PFMainChart from "@/components/PFMainChart.vue";
</script>

<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Price</th>
          <th class="text-left">Balance</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in coreStore.getAssetsBalance" :key="asset.id">
          <td>{{ asset.name }}</td>
          <td>{{ asset.last_price }}$</td>
          <td>
            {{ Number(asset.balance_with_decimals.toFixed(4)) }}
            {{ asset.ticker }}
          </td>
          <td>
            {{
              Number(
                (asset.balance_with_decimals * asset.last_price).toFixed(2)
              )
            }}$
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>Total balance</td>
          <td></td>
          <td></td>
          <td>{{ Number(coreStore.getTotalBalance.toFixed(2)) }}$</td>
        </tr>
      </tbody>
    </template>
  </v-table>
  <PFMainChart />
</template>

<style scoped>
.v-table {
  margin: 10px;
}
</style>