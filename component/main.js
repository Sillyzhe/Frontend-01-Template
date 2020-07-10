
let component = <Parent id = "a" class="b">
    <Child></Child>
    <Child></Child>

</Parent>;
console.log(component)
// component.setAttribute("id", "a")

class Parent{
    set class(v){
        console.log("Parent::class",v)
    }
}

class Child{

}

// 70min

function create(Cls,attributes){
    let o=new Cls;
    for(let name in attributes){
        o[name]=attributes[name]
    }
    return o
}