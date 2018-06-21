/*
* observe 其实也涉及到一个问题，明明一个函数能写完的功能 为什么要拆成三个函数来写。为什么要拆、拆的依据是什么呢!
* */
import {Dep} from './dep'
import {
    isObject,
    isPlainObject
} from '../util'
export class Observe {
    constructor (value) {
        this.value = value
        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    walk (obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
    observeArray (items) {
    }
}
export function observe (value) {
    debugger
    if (!isObject(value)) {
        return
    }
    let ob
    if (Array.isArray(value) && isPlainObject(value)) { // 因为在Observer实例的时候给value定义了一个__ob__属性，所以要求value是可以扩展的，Object.isExtensible(value)
        ob = new Observe(value)
    }
    return ob
}
export function defineReactive (obj, key, val) {
    const dep = new Dep()
    // 如果该属性是不可配置的，那么后面的defineProperty就没有意义而且代码会报错
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }
    // 如果属性值是对象型值，那么还要对这个值进行再次监听，所以会有这一步。
    observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                // 进行dep绑定
            }
            return value
        },
        set: function (newval) {
            const value = getter ? getter.call(obj) : val
            if (value === newval || (newval !== newval && value !== value)) {
            }
            if (setter) {
                setter.call(obj, newval)
            } else {
                val = newval
            }
            // 如果在改变值的时候，将普通字面值改成了对象型值， 那么还要对新设置这个值建立监听。
            observe(newval)
            dep.notify()
        }
    })
}
