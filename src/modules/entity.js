export const colors = [
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
]

export const icons = [
  { name: "Key", value: "fas fa-key" },
  { name: "Address book", value: "fas fa-address-book" },
  { name: "At", value: "fas fa-at" },
  { name: "Comments", value: "fas fa-comments" },
  { name: "Database", value: "fas fa-database" },
  { name: "Desktop", value: "fas fa-desktop" },
  { name: "Envelope", value: "fas fa-envelope" },
  { name: "Laptop", value: "fas fa-laptop" },
  { name: "Wallet", value: "fas fa-wallet" },
  { name: "Mobile", value: "fas fa-mobile" },
  { name: "SD Card", value: "fas fa-sd-card" },
  { name: "Server", value: "fas fa-server" },
  { name: "WiFi", value: "fas fa-wifi" },
  { name: "Credit card", value: "fas fa-credit-card" },
  { name: "Money bill", value: "fas fa-money-bill" },
  { name: "Piggy bank", value: "fas fa-piggy-bank" }
]

export function colorId(value) {
  return colors.findIndex(color => value == color.value)
}

export function iconId(value) {
  return icons.findIndex(icon => value == icon.value)
}