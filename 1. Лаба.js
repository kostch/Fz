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
const transposing = graph.map((_, colIndex) => graph.map(row => row[colIndex])) // перевернутая матрица смежности (транспозиция)

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

function Q(i) { //Антипроход (контрдостижимые) Взврат всех вершин из которых можно придти в заданную
    function _(i) { //список всех вершин на первом шаге (которые прямо можно достигунть
        let queue = []
        for (let a = 0; a < transposing[i].length; a++) {
            if (transposing[i][a] === 1) {
                queue.push(a)
            }
        }
        return queue;
    }

    let queue = _(i)
    let result = _(i)
    while (queue.length !== 0) {
        let Z = queue.shift()
        let arr = _(Z)
        arr = arr.filter(v => !result.includes(v))
        queue.push(...arr)
        queue = [...new Set(queue)]
        arr.forEach(v => result.push(v))
    }
    let set = result
    return set
}

function Remove(i) {
    let Z = 0
    let intersection = []
    let difference = [10]
    let res = []
    while (res.length !== 9) { // цикл до длинны масива 0
        let Ri = R(Z)
        let Ui = U(Z)
        Ri.sort(function(a, b) {
            return a - b;
        });
        intersection = Ri.filter(x => Ui.includes(x)); // То что пересекается
        let acac = intersection.filter(x => !res.includes(x));
        console.log(acac, 'Обединение вершин номер ', (i++))
        res.push(...acac)
        difference = R(0).filter(x => !res.includes(x)); //то чего нет в intersection
        if (difference[0] === undefined) {
            let az = intersection[0] + 1;
            difference.unshift(az);
        }
        Z = difference[0];
    }
}

console.log(Remove(0))
