const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, _) => {
    setTimeout(resolve, 1000, 'foo');
});

async function f(values: any[]) {
    console.log('start', new Date())
    const results = await Promise.all(values);

    console.log('result', results)

    console.log('end  ', new Date())
}

f([promise1, promise2, promise3])