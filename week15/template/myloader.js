var parser = require("./parser");
module.exports = function (source, map) {
  let tree=parser.parseHTML(source)
  console.log(JSON.stringify(tree))
  console.log(tree.children[2].children[0].content);



  // console.log("my loader is runing!!!!!\n", this.resourcePath);
  return `

  `;
};
