
function createElement(Cls, attributes, ...children){
    
    let o;

    if(typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for(let name in attributes) {
        // o.setAttribute(name, attributes[name]);
        o[name] = attributes[name]
    }

    //console.log(children);
    console.log(o);
    for(let child of children) {
        if(typeof child === "string"){
          child = new Text(child);
        }
        o.appendChild(child);
    }
    console.log(o)
    return o;
}

class Text {
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

// 代理
class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);

    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}

class MyComponent {
    constructor(config){
        this.children = [];
        this.attributes=new Map();
        this.properties=new Map();
    }

    setAttribute(name, value) { //attribute
        // this.root.setAttribute(name, value);
        this.attributes.set(name,value)
    }

    appendChild(child){
        this.children.push(child);
    }

    set title(value){
      this.properties.set("title",value)
    }

    render(){
        return <article>
             {/* <h1>{this.attributes.get("title")}</h1> */}
             <h2>{this.properties.get("title")}</h2>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            // debugger;
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)

    }


}


/*let component = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
        <div></div>
        <p></p>
        <div></div>
        <div></div>
    </div>*/

let component = <MyComponent title="I'm a title">
    <div>text text text</div>
</MyComponent>
    
component.title="I'm a title2"
component.mountTo(document.body);
/*
var component = createElement(
    Parent, 
    {
        id: "a",
        "class": "b"
    }, 
    createElement(Child, null), 
    createElement(Child, null), 
    createElement(Child, null)
);
*/

console.log(component);

//componet.setAttribute("id", "a");