import {
  API_AUTH_ERR,
  API_INVALID_SESSION,
  API_FATAL_ERR
} from "@/modules/api";

export const colors = {
  colors: [
    { name: "Red", value: "red darken-1" },
    { name: "Pink", value: "pink darken-1" },
    { name: "Purple", value: "purple darken-1" },
    { name: "Deep purple", value: "deep-purple darken-1" },
    { name: "Indigo", value: "indigo darken-1" },
    { name: "Blue", value: "blue darken-1" },
    { name: "Light blue", value: "light-blue darken-1" },
    { name: "Cyan", value: "cyan darken-1" },
    { name: "Teal", value: "teal darken-1" },
    { name: "Green", value: "green darken-1" },
    { name: "Light green", value: "light-green darken-1" },
    { name: "Lime", value: "lime darken-1" },
    { name: "Yellow", value: "yellow darken-1" },
    { name: "Amber", value: "amber darken-1" },
    { name: "Orange", value: "orange darken-1" },
    { name: "Deep orange", value: "deep-orange darken-1" },
    { name: "Brown", value: "brown darken-1" },
    { name: "Blue-Grey", value: "blue-grey darken-1" },
    { name: "Grey", value: "grey darken-1" }
  ],
  num(value) {
    return this.colors.findIndex(c => c.value == value)
  }
}

export const icons = {
  icons: [
    { name: "Key", value: "mdi-key-variant" },
    { name: "Access point", value: "mdi-access-point" },
    { name: "Account", value: "mdi-account" },
    { name: "Account card", value: "mdi-account-card-details" },
    { name: "Account network", value: "mdi-account-network" },
    { name: "Airplane", value: "mdi-airplane" },
    { name: "Alien", value: "mdi-alien" },
    { name: "Android", value: "mdi-android" },
    { name: "Antenna", value: "mdi-antenna" },
    { name: "Api", value: "mdi-api" },
    { name: "Apps", value: "mdi-apps-box" },
    { name: "Archive", value: "mdi-archive" },
    { name: "Balloon", value: "mdi-balloon" },
    { name: "Bank", value: "mdi-bank" },
    { name: "Basket", value: "mdi-basket" },
    { name: "Bike", value: "mdi-bike" }
  ],
  map(id) {
    return this.icons[id].value || 'mdi-key-variant'
  },
  num(value) {
    return this.icons.findIndex(i => value == i.value)
  }
}

export const UI_USER_LOGOUT = "ui_user_logout"

export const alert = {
  config: {
    handler: val => { }
  },
  tables: {
    [API_FATAL_ERR]: {
      message: "Network error occurred, please try again.",
      color: "error"
    },
    [API_INVALID_SESSION]: {
      message: "Your session expired, please log in to continue.",
      color: "warning"
    },
    [API_AUTH_ERR]: {
      message: "Invalid username and/or password. Check your data.",
      color: "error"
    },
    [UI_USER_LOGOUT]: {
      message: "Logout successful. Have a nice day.",
      color: "info"
    }
  },
  show(message, color) {
    this.config.handler({ message, color })
  },
  status(status) {
    if (this.tables[status] !== undefined) {
      this.config.handler(this.tables[status])
    }
  }
}
