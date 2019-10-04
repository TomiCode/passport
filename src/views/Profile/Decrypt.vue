<template>
  <v-container fluid>
    <v-alert outlined type="info">
      Insert your main container decryption password below and remember it cannot be recovered.
    </v-alert>
    <v-text-field
      type="password"
      v-model="password"
      label="Username"
      prepend-inner-icon="far fa-user"
    ></v-text-field>
    <v-btn>Decrypt</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    password: ""
  })
}
</script>