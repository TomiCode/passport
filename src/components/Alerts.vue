<template>
  <div class="system-alerts">
    <v-fade-transition group>
      <v-alert
        elevation="2"
        border="left"
        tile dense
        v-for="(alert, index) in alerts" :key="index"
        :type="alert.type"
      >
        {{ alert.message }}
      </v-alert>
    </v-fade-transition>
  </div>

</template>

<script>
import { alert } from "@/modules/ui";

export default {
  data: () => ({
    alerts: [ ]
  }),
  created() {
    alert.config.handler = alert => {
      this.alerts.push(alert)
      setTimeout(() => {
        this.alerts.splice(this.alerts.indexOf(alert), 1)
      }, 4000)
    }
    if (alert.config.preload.length > 0) {
      alert.config.preload.forEach(alert => {
        this.alerts.push(alert)
        setTimeout(() => {
          this.alerts.splice(this.alerts.indexOf(alert), 1)
        }, 5000)
      })
      alert.config.preload.length = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.system-alerts {
  position: fixed;
  top: 1em;
  right: 1em;
  width: 480px;
  z-index: 9999;
}
</style>