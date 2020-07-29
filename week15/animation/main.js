import { Timeline, Animation ,ColorAnimation} from "./animation.js";


function createElement(Cls, attributes, ...children) {
  let o;

  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls();
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  let visit = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new Text(child);
      }
      if (child instanceof Array) {
        visit(child);
        continue;
      }
      o.appendChild(child);
    }
  };
  visit(children);
  return o;
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

// 代理
class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    //attribute
    this.root.setAttribute(name, value);
  }

  get style() {
    return this.root.style;
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  mountTo(parent) {
    for (let child of this.children) {
      if (child instanceof Wrapper || child instanceof Text) {
        child.mountTo(this.root);
      }
    }
    parent.appendChild(this.root);
  }
}

class Carousel {
  constructor(config) {
    // this.children = [];
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  // appendChild(child) {
  //   this.children.push(child);
  // }

  render() {
    let children=this.data.map((url)=>{
      let element=<img src={url} />
      element.addEventListener("dragstart",e=>e.preventDefault());
        return element
    })
    let root=<div class={this.class} >{children}</div>

    let position = 0;
    let nextPic = () => {
      let nextPosition = (position + 1) % children.length;

      let current = children[position];
      let next = children[nextPosition];

      // current.style.transition = 'ease 0s';
      // next.style.transition = 'ease 0s';
      current.style.transition = "none";
      next.style.transition = "none";

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(function () {
        current.style.transition = "ease 0.5s";
        next.style.transition = "ease 0.5s";

        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        position = nextPosition;
      }, 16);
      setTimeout(nextPic, 2000);
    };
    setTimeout(nextPic, 3000);

    root.addEventListener("mousedown", (event) => {
      let { clientX: startX, clientY: startY } = event;

      let nextPosition = (position + 1) % this.data.length;
      let lastPosition =
        (position - 1 + this.data.length) % this.data.length;

        console.log(position)
      let current = root.childNodes[position];
      let last = root.childNodes[lastPosition];
      let next = root.childNodes[nextPosition];

      current.style.transition = "ease 0s";
      last.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${-500 * position}px)`;
      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      let move = (event) => {
        current.style.transform = `translatex(${
          event.clientX - startX - 500 * position
        }px)`;

        last.style.transform = `translatex(${
          event.clientX - startX - 500 - 500 * lastPosition
        }px)`;

        next.style.transform = `translatex(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
        // console.log(event.clientX - startX, event.clientX - startY);
      };
      let up = (event) => {
        let offset = 0;
        if (event.clientX - startX > 250) {
          offset = 1;
        } else if (event.clientX - startX < -250) {
          offset = -1;
        }

        current.style.transition = "";
        last.style.transition = "";
        next.style.transition = "";

        position =
          (position - offset + this.data.length) % this.data.length;
          
        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    return root
  }

  mountTo(parent) {
    // for(const child of this.children){
    //   this.appendChild(child)
    // }
    this.render().mountTo(parent);
  }
}

let component = (
  <Carousel
  class="carousel"
    data={[
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]}
  ></Carousel>
);

component.mountTo(document.body);

console.log(component);

//componet.setAttribute("id", "a");
