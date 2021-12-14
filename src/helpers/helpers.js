export function capitalizeFirstLetter(string) {
    string = string.charAt(0).toUpperCase() + string.slice(1)
    return string.replace("_"," ")
  }