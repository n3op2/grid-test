// N | S | W | E
const directions = {
    left: [0, 1],
    down: [1, 0],
    right: [0, -1],
    up: [-1, 0],
};

export default class View {
    constructor(grid) {
        this.grid = grid;
    }

    #look = ({x, y}, [dy, dx], found) => {
        try { 
            const vector = this.grid[y + dy][x + dx]; 
            if (vector.val && !found.some(v => v.id === vector.id))
                return vector;
        } catch {}
    }

    findAll = (cur, found = [], tmp = []) => {
        if (!cur.val) return [];
        // append additional props, can be passed as arg 
        found.push({ ...cur, focus: true, active: false });
        for (var dir in directions) {
            const vector = this.#look(cur, directions[dir], found);
            if (vector) tmp.push(vector);
        }

        tmp.map(v => this.findAll(v, found));
        found[0].active = true;
        return found;
    }
}
