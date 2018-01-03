export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  }
   
  export function addClass(el, className) {
    if (hasClass(el, className)) {
      return
    }
   
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
  export function getData(ele,name,val) {
    const prefix = 'data-'
    name = prefix + name
    if(val) {
      return ele.setAttribute(name,val)
    } else {
      return ele.getAttribute(name)
    } 
  }