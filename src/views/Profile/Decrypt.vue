<template>
  <v-container fluid>
    <v-alert outlined type="info">
      Insert your main container decryption password below and remember it cannot be recovered.
    </v-alert>
    <v-text-field
      type="password"
      v-model="password"
      label="Container password"
      prepend-inner-icon="fas fa-server"
    ></v-text-field>
    <v-select
      :items="containers"
      label="Container"
    ></v-select>
    <v-btn outlined color="primary">Decrypt</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    password: "",
    containers: ["Default"]
  })
}
</script>