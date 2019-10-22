export const OPT_UPPERCASE = "uppercase"
export const OPT_LOWERCASE = "lowercase"
export const OPT_NUMBERS = "numbers"
export const OPT_SPECIAL = "special"

const ch_opt_arr = {
  [OPT_UPPERCASE]: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  [OPT_LOWERCASE]: "abcdefghijklmnopqrstuvwxyz",
  [OPT_NUMBERS]: "0123456789",
  [OPT_SPECIAL]: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
}

export function generate(options, length) {
  let characters = options.map(opt => ch_opt_arr[opt]).join('')
  return Array(length)
    .fill('')
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .sort(() => { 0.5 - Math.random() })
    .join('')
}