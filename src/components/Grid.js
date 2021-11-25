export default function(w, h, el) {
    return new Array(h).fill().map((_, y) => 
        new Array(w).fill().map((_, x)  => ({
            val: Math.round(Math.random() / 1.3),
            id: Math.random().toString(16).slice(2), // for easier look up
            x,
            y,
            el,
        })
    ));
}
