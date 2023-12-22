const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'foo');
});

async function f() {
    console.log('start')
    const results = await Promise.all([promise1, promise2, promise3]);

    console.log('result', results)

    console.log('end')
}

f()