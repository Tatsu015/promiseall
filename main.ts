const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, _) => {
    setTimeout(resolve, 1000, 'foo');
});

async function f(values: any[]) {
    const results = await Promise.all(values);
    return results
}

async function main() {
    console.log('[start]', new Date())
    const results = await f([promise1, promise2, promise3])
    console.log(results)
    console.log('[ end ]', new Date())
}

main()