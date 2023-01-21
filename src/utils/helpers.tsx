export function stopAnimation(id: number) {
    const car = document.getElementById('car'+id);
    if (car === null) return;
    car.style.animationPlayState = 'paused';
}

export function startAnimation(id: number, time: number) {
    const car = document.getElementById('car'+id);
    if (car === null) return;
    car.style.animation = (time === Infinity) 
    ? ''
    : `race ${time}s linear forwards`;
}

export function calcTime(distance: number, velocity: number) {
    const COUNT_MS_IN_SECOND = 1000;
    return distance/velocity/COUNT_MS_IN_SECOND;

}