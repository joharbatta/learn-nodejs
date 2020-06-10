const foo = () => {
    console.log('Hey');
    bar();
 }
 
 const bar = () => {
    console.log('Hello');
    setTimeout(() => {
        console.log('I am executed at last!');
    }, 2000);
    baz();
 }
 
 const baz = () => {
    console.log('Hi');
 }
 
 foo();