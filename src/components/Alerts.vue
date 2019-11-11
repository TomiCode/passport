<template>
  <div class="system-alert">
    <v-snackbar
      top
      right
      v-model="visible"
      :color="alert.color"
      :timeout="timeout"
    >
      {{ alert.message }}
      <v-btn text @click="visible = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { alert } from "@/modules/ui";

export default {
  data: () => ({
    alerts: [ ],
    visible: false,
    timeout: 3000,
    alert: {
      message: "",
      color: ""
    }
  }),
  created() {
    alert.config.handler = alert => {
      if (!this.visible) {
        this.alert = Object.assign(this.alert, alert)
        this.visible = true
      }
      else {
        this.alerts.push(alert)
      }
    }
  },
  watch: {
    visible (value) {
      if (!value) {
        if (this.alerts.length > 0) {
          this.alert = Object.assign(this.alert, this.alerts.shift())
          setTimeout(() => this.visible = true, 50)
        }
      }
    }
  }
}
</script>