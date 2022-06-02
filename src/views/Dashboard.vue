<script setup>
import { useCoreStore } from "@/stores/core";
import { onMounted } from 'vue'

import PFDistributionChart from "@/components/PFDistributionChart.vue";
import PChartHistory from "../components/PChartHistory.vue";

const coreStore = useCoreStore();

onMounted(() => {
  coreStore.loadHistory();
});

</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price (24h change)</th>
                  <th class="text-left">Balance</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="asset in coreStore.getAssetsBalance"
                  :key="asset.id"
                  v-show="asset.show"
                >
                  <td>{{ asset.name }}</td>
                  <td>
                    {{ asset.last_price }}$
                    <span style="font-size: 10px"
                      >({{
                        (
                          (asset.price_24h_change * asset.last_price) /
                          100
                        ).toFixed(2)
                      }}$)</span
                    >
                  </td>
                  <td>
                    {{ Number(asset.balance_with_decimals.toFixed(4)) }}
                    {{ asset.ticker }}
                  </td>
                  <td>
                    {{
                      (
                        asset.balance_with_decimals *
                        asset.last_price *
                        coreStore.getCurrency.multiplier
                      ).toFixed(coreStore.getCurrency.decimals)
                    }}{{ coreStore.getCurrency.postfix }}
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
                  <td>
                    {{
                      Number(
                        (coreStore.getTotalBalance * coreStore.getCurrency.multiplier).toFixed(
                          coreStore.getCurrency.decimals
                        )
                      )
                    }}{{ coreStore.getCurrency.postfix }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="9" sm="12" xs="12">
      <v-card>
        <v-card-title>Balance history</v-card-title>
        <v-card-text>
          <PChartHistory :chartData="coreStore.history" :chartName="'Total balance, USD'"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col md="3" sm="12" xs="12">
      <v-card>
        <v-card-title>Balance distribution</v-card-title>
        <v-card-text>
          <PFDistributionChart />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>