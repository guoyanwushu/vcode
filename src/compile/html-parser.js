/*
* html 片段编译  功能总是和需求相关的 没有理解到需求盲目去看功能 自然不能理解到功能为啥要这么写
* */
const startTagOpen = /^<((?:[a-zA-Z_][\w\-\.]*:)?[a-zA-Z_][\w\-\.]*)/
const startTagClose = /^\s*([\/]?)>/
const  attrReg = /^\s*([^\s"'<>=]+)\s*(=)\s*(?:(?:"([^"<>=\s]+)")|(?:'([^'=<>/s]+)'))/
let match;
export function parse (html) {

    var index=0,html = html,stack = []
    while (html) {
        // 首先得判断是不是标签
        if (match = html.match(startTagOpen)) {
            let end,attr,ele = {tagName:'',attrs:[]}
            // 是了之后就要取标签名
            let tagName = match[1]
            ele.tagName = tagName
            // 取了标签名判断标签是否结束，如果结束就结束，如果没结束就得取属性名和属性值
            advance(match[0].length);
            while (!(end = html.match(startTagClose)) && (attr = html.match(attrReg))) {
                advance(attr[0].length)
                ele.attrs.push(attr);
            }
            if (end) {
                let singleFlag = end[1]
                if (singleFlag) {
                    ele.singleFlag = true
                }
                else {
                    ele.singleFlag = false
                }
                advance(end[0].length)
                stack.push(ele);
                console.log(stack);
            }
        }
        // 不是标签的情况下
        else {
            let ele = {type:3}
            // 找到下一个标签起始点
            if (match = html.match(startTagOpen)) {
                ele.text = html.substring(0,match.index+1)
                advance(match.index+1)
            }
            else {
                ele.text = html
            }
            stack.push(ele)
            html = ''
        }
    }
    function  advance (n) {
        index += n;
        html = html.substring(n);
    }

}