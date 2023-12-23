const promise1: Promise<string> = new Promise((resolve, _) => {
    setTimeout(resolve, 500, 'hoge');
});
const promise2: Promise<string> = new Promise((resolve, _) => {
    setTimeout(resolve, 700, 'fuga');
});
const promise3: Promise<string> = new Promise((resolve, _) => {
    setTimeout(resolve, 1000, 'piyo');
});

type Promises = Record<string, Promise<any>>
type Awaiteds = { [K in keyof Promises]: Awaited<Promises[K]> }

async function promiseAll(promises: Promises): Promise<Awaiteds> {
    const elms = Object.entries(promises)
    const keys = elms.map((e) => e[0])
    const values = elms.map((e) => e[1])

    const results = await Promise.all(values);
    const ret = keys.reduce((a, v, index) => ({ ...a, [v]: results[index] }), {})
    return ret
}

async function main() {
    console.log('[start]', new Date())

    const obj: Promises = {
        p1: promise1,
        p2: promise2,
        p3: promise3,
    }
    const results = await promiseAll(obj)

    console.log(results)
    console.log('[ end ]', new Date())
}

main()