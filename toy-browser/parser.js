let currentToken = null;
let currentAttribute = null;

let stack = [{
  type: "document",
  children: []
}]

let currentTextNode = null;

function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    };
    element.tagname = token.tagName;


    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    top.children.push(element);
    element.parent = top;
    if (!token.selfCloseStartTag) {
      stack.push(element)
    }
    currentTextNode = null;
  } else if (token == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      stack.pop()
    }
    currentTextNode = null;
  } else if (token.type == "text") {
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }

  if (token.type != "text") {
    console.log(token)
  }
}

const EOF = Symbol("EOF") // EOF: End OF File





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
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {

  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c)
  } else if (c == ">") {

  } else if (c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfCloseStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c == ">") {
    // console.log(currentToken)
    emit(currentToken);
    return data;
  } else {
    console.log(c)
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c)
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

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else {
    return data;
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c)
  } else if (c == "=") {
    return beforeAttributeValue
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<") {

  } else {
    currentAttribute.name += c;
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return beforeAttributeValue
  } else if (c == "\"") {
    return doubleQuotedAttributeValue;
  } else if (c == "'") {
    return singleQuotedAttributeValue;
  } else if (c == ">") {

  } else {
    return UnquotedAttributeValue(c)
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfCloseStartTag
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return afterQuotedAttributeValue
  } else if (c == "\u0000") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c == "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);

    return afterQuotedAttributeValue
  } else if (c == "\u0000") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == "/") {
    return selfCloseStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken.value += c;
    return afterQuotedAttributeValue
  }
}

function selfCloseStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;
    return data
  } else if (c == "EOF") {

  } else {

  }
}


module.exports.parserHTML = function (html) {
  // console.log(html)
  let state = data;
  for (let c of html) {
    try {
      state = state(c)
    } catch (error) {

    }
  }
  state = state(EOF)
  // console.log(stack[0])
  // console.log(stack[0].children.forEach(children => {
  //   console.log(children)
  //   if (children.children&&children.children.length > 1) {
  //     children.children.forEach(child => {
  //       console.log(child)
  //     })
  //   }
  // }))
}