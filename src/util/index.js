export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
// 这个函数用于判定obj是否是纯粹的对象，而不是数组或者正则这种伪对象
export function isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}