// const promise1: Promise<string> = new Promise((resolve, _) => {
//     console.log('promise1 start')
//     setTimeout(resolve, 500, 'hoge');
// });
// const promise2: Promise<string> = new Promise((resolve, _) => {
//     console.log('promise2 start')
//     setTimeout(resolve, 700, 'fuga');
// });
// const promise3: Promise<string> = new Promise((resolve, _) => {
//     console.log('promise3 start')
//     setTimeout(resolve, 1000, 'piyo');
// });

const syncFetch = async (url: string): Promise<string> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error! ${res.status}`)
    }
    const data = await res.text()
    return data;
}

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

    // const obj: Promises = {
    //     p1: promise1,
    //     p2: promise2,
    //     p3: promise3,
    // }

    const obj: Promises = {
        p1: syncFetch('http://worldtimeapi.org/api/timezone/Asia/Tokyo'),
        p2: syncFetch('http://worldtimeapi.org/api/timezone/America/New_York'),
    }
    const results = await promiseAll(obj)

    console.log(results)
    console.log('[ end ]', new Date())
}

main()