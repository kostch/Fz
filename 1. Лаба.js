const graph = [ //матрица смежности
    [null, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, null, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, null, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, null, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, null, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, null, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, null, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, null, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, null],
]
let transposing = graph.map((_, colIndex) => graph.map(row => row[colIndex])) // перевернутая матрица смежности

function R(i) { // Возвращает список всех вершин достижимых из заданой
    let queue = U(i)
    let result = new Set(U(i))
    while (queue.length !== 0) {
        let Z = queue.shift()
        let arr = U(Z)
        arr = arr.filter(v => !result.has(v))
        queue.push(...arr)
        queue = [...new Set(queue)]
        arr.forEach(v => result.add(v))
    }
    return new Set(result)
}

R(0)

function U(i) { //Список прямодостижимых вершин (достижимых на первом шаге)
    let queue = []
    for (let a = 0; a < graph[i].length; a++) {
        if (graph[i][a] === 1) {
            queue.push(a)
        }
    }
    return queue;
}

function Q(i) { //Антипроход (контрдостижимые) Взврат всех вершин из которых можно придти в заданную
    function _(i) { //список всех вершин на первом шаге (которые прямо можно достигунть
        let queue = []
        for (let a = 0; a < graph[i].length; a++) {
            if (graph[a][i] === 1) {
                queue.push(a)
            }
        }
        return queue;
    }

    let queue = _(i)
    let result = new Set(_(i))
    while (queue.length !== 0) {
        let Z = queue.shift()
        let arr = _(Z)
        arr = arr.filter(v => !result.has(v))
        queue.push(...arr)
        queue = [...new Set(queue)]
        arr.forEach(v => result.add(v))
    }
    let set = new Set(result);
    set.delete(i)
    return set
}

/*function removeEdge(i) { // Удаляем указанную вершину из матрицы
    graph[i] = new Array(graph[i].length).fill(null)
    for (let j = 0; j < graph.length; j++) {
        graph[j][i] = null
    }
}

for (let i = graph.length - 1; i > -1; i--) {
    const a = [...new Set([...R(i)].filter(x => Q(i).has(x)))] //Пересечение R и Q, одну вершину выкидываем, остальные удаляем
    a.shift();
    a.forEach(removeEdge);
}*/

//console.log(Q(0)); // Проверка из каких вершин можно придти в эту точку
