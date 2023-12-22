const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, _) => {
    setTimeout(resolve, 1000, 'foo');
});

async function promiseAll(obj: {}) {
    const values = Object.values(obj)
    const results = await Promise.all(values);
    return results
}

async function main() {
    console.log('[start]', new Date())

    const obj = {
        p1: promise1,
        p2: promise2,
        p3: promise3,
    }
    const results = await promiseAll(obj)

    console.log(results)
    console.log('[ end ]', new Date())
}

main()