<script setup>
import { useCoreStore } from "@/stores/core";
import PFHistoryChart from "@/components/PFHistoryChart.vue";
import PFDistributionChart from "@/components/PFDistributionChart.vue";

const coreStore = useCoreStore();
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
                  <th class="text-left">Price</th>
                  <th class="text-left">Balance</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="asset in coreStore.getAssetsBalance" :key="asset.id" v-show="asset.show">
                  <td>{{ asset.name }}</td>
                  <td>{{ asset.last_price }}$</td>
                  <td>
                    {{ Number(asset.balance_with_decimals.toFixed(4)) }}
                    {{ asset.ticker }}
                  </td>
                  <td>
                    {{
                      Number(
                        (
                          asset.balance_with_decimals * asset.last_price
                        ).toFixed(2)
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="9" sm="12" xs="12">
      <v-card>
        <v-card-title>Balance history</v-card-title>
        <v-card-text>
          <PFHistoryChart />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="coreStore.setHistorySetting('all')" :color="coreStore.history_settings=='all' ? 'secondary' : 'primary'" :disabled="coreStore.history_settings=='all'" border>All time</v-btn>
          <v-btn @click="coreStore.setHistorySetting('month')" :color="coreStore.history_settings=='month' ? 'secondary' : 'primary'" :disabled="coreStore.history_settings=='month'" border>Last month</v-btn>
          <v-btn @click="coreStore.setHistorySetting('week')" :color="coreStore.history_settings=='week' ? 'secondary' : 'primary'" :disabled="coreStore.history_settings=='week'" border>Last week</v-btn>
          <v-btn @click="coreStore.setHistorySetting('day')" :color="coreStore.history_settings=='day' ? 'secondary' : 'primary'" :disabled="coreStore.history_settings=='day'" border>Last day</v-btn>
        </v-card-actions>
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