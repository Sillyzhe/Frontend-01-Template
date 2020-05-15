let currentToken = null;
let currentAttribute = null;

function emit(token) {
    if (this.type != "text") {
        console.log(token)
    }
}

const EOF = Symbol("EOF")


module.exports.parserHTML = function (html) {
    console.log(html)
    let state = data;
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}



function data(c) {
    if (c == "<") {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: "EOF"
        })
        return
    } else {
        emit({
            type: "text",
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]/)) {
        currentToken = {
            type: "string"
        }
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]/)) {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return seleCloseStartTag
    } else if (c.match(/^[a-zA-Z]/)) {
        currentToken.tagName += c
        return tagName
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data
    } else if (c == "=") {
        // return beforeAttributeName
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c)
    }
}


function attributeName(c){
    if(c.match(/^[\t\n\f ]$/)||c=="/"||c==">"||c==EOF){
        return afterAttributeName(c)
    }else if(c=="="){
        return beforeAttributeValue
    }else if(c=="\u0000"){

    }else if(){

    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){

    }
}

function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name]=currentAttribute.value;
        return beforeAttributeName;
    }else if(c=="/"){
        currentToken[currentAttribute.name]=currentAttribute.value;
        return seleCloseStartTag
    }else if(c==">"){
        currentToken[currentAttribute.name]=currentAttribute.value;
        emit()
    }
}


function seleCloseStartTag() {

}