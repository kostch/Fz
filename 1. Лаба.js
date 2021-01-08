const graph = [ //матрица смежности
    [1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 1],
]

function R(i) { // Возвращает список всех вершин достижимых из заданой
    let queue = U(i)
    let result = []
    result = [... new Set(U(i))]
    while (queue.length !== 0) {
        let Z = queue.shift()
        let arr = U(Z)
        arr = arr.filter(v => !result.includes(v))
        queue.push(...arr)
        queue = [...new Set(queue)]
        arr.forEach(v => result.push(v))
    }
    return result;
}

function U(i) { //Список прямодостижимых вершин (достижимых на первом шаге)
    let queue = []
    for (let a = 0; a < graph[i].length; a++) {
        if (graph[i][a] === 1) {
            queue.push(a)
        }
    }
    return queue;
}

function Remove(i) {
    let Ri = R(i)
    let Ui = U(i)
    let result = []
    result = [...new Set(Del(i))]

    function Del(i) {
        let intersection = Ri.filter(x => Ui.includes(x));
        console.log(intersection, 'intersection')

    }
}
// console.log(U(0), 'Проверка. Список вершин прямодостижимых ')
console.log(R(0), 'Все достижимые вершины из заданной'); // Все вершины достижимые из заданной
console.log(Remove(0))
