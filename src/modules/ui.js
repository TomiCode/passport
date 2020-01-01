import {
  API_AUTH_ERR,
  API_INVALID_SESSION,
  API_FATAL_ERR
} from "@/modules/api";

export const colors = {
  colors: [
    { name: "Red", value: "red darken-1" },
    { name: "Pink", value: "pink darken-1" },
    { name: "Purple", value: "purple" },
    { name: "Deep purple", value: "deep-purple darken-1" },
    { name: "Indigo", value: "indigo" },
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
  num: value => colors.colors.findIndex(c => c.value == value)
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
  map: id => id ? icons.icons[id].value || 'mdi-key-variant' : 'mdi-key-variant',
  num: value => icons.icons.findIndex(i => value == i.value)
}

export const UI_USER_RESET = "ui_user_pass_reset"
export const UI_USER_LOGOUT = "ui_user_logout"
export const UI_USER_REGISTERED = "ui_user_registered"
export const UI_REQUIRE_AUTH = "ui_require_auth"
export const UI_ALREADY_AUTH = "ui_already_auth_complete"
export const UI_INVALID_DECRYPT = "ui_invalid_decrypt_pass"
export const UI_CREATED_ENTITY = "ui_created_entity"
export const UI_UPDATED_ENTITY = "ui_updated_entity"

export const alert = {
  config: {
    handler: null,
    preload: [ ]
  },
  tables: {
    [API_FATAL_ERR]: {
      message: "Network error occurred, please try again.",
      type: "error"
    },
    [API_INVALID_SESSION]: {
      message: "Your session expired, please log in to continue.",
      type: "warning"
    },
    [API_AUTH_ERR]: {
      message: "Invalid username and/or password. Check your data.",
      type: "error"
    },
    [UI_USER_RESET]: {
      message: "Password reset procedure was send at the provided email address.",
      type: "info"
    },
    [UI_USER_LOGOUT]: {
      message: "Logout successful. Have a nice day.",
      type: "info"
    },
    [UI_USER_REGISTERED]: {
      message: "Your account is successfully registered. Please login to Your new account.",
      type: "success"
    },
    [UI_REQUIRE_AUTH]: {
      message: "You need to authenticate to continue.",
      type: "error"
    },
    [UI_INVALID_DECRYPT]: {
      message: "You provided an invalid password, try again.",
      type: "error"
    },
    [UI_CREATED_ENTITY]: {
      message: "Your entity was created successfully!",
      type: "success"
    },
    [UI_ALREADY_AUTH]: {
      message: "You are already authenticated.",
      type: "warning"
    },
    [UI_UPDATED_ENTITY]: {
      message: "Your entry was updated successfully!",
      type: "success"
    }
  },
  status(status) {
    if (this.tables[status] !== undefined) {
      if (this.config.handler !== null) {
        this.config.handler(this.tables[status])
      }
      else {
        this.config.preload.push(this.tables[status])
      }
    }
  }
}

export const clipboard = {
  style: "width:0!important;padding:0!important;border:0!important;margin:0!important;outline:none!important;boxShadow:none!important;",
  clear: () => clipboard.set(' '),
  set: value => {
    const textarea = document.createElement("textarea")

    textarea.value = value
    textarea.setAttribute("readonly", "")
    textarea.style.cssText = clipboard.style

    document.body.appendChild(textarea)

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const editable = textarea.contentEditable;
      const readOnly = textarea.readOnly;

      textarea.contentEditable = true
      textarea.readOnly = true

      const range = document.createRange()
      range.selectNodeContents(textarea)

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      textarea.setSelectionRange(0, 999999)
      textarea.contentEditable = editable
      textarea.readOnly = readOnly
    } else {
      textarea.select()
    }

    let success = false
    try {
      success = document.execCommand("copy")
    } catch (err) {
      console.log(err)
    }
    finally {
      document.body.removeChild(textarea)
    }
    return success
  }
}

export const validatiors = {
  required: (val) => !!val || 'This field is required.',
  user: {
    email: (val) => /^\S+@\S+[\.][0-9a-z]+$/.test(val) || 'Invalid email address.',
    username: (val) => /^[A-Za-z]+$/.test(val) || 'Invalid username.',
  },
  category: {
    name: (val) => (val.length > 2 && val.length <= 24) || 'Invalid category name',
    description: (val) => (val.length <= 32) || 'Category description to long!'
  },
  entity: {
    name: (val) => (val.length > 3 && val.length <= 32) || 'Invalid entry name.',
    description: (val) => (val.length <= 64) || 'Entry description is too long.',
    login: (val) => (val.indexOf("@") === -1) || validatiors.user.email(val),
    notes: (val) => (val.length <= 255) || 'Note is too long, remember to keep it short!',
    other: (val) => (val.length <= 255) || 'To many characters!'
  }
}