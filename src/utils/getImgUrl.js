function getImgUrl (name) {
    return new URL(`../assets/plants/${name}`, import.meta.url)
}
export {getImgUrl}