class Publisher {
    constructor() {
        this.observers = [];
        this.data = null;
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
}

module.exports = Publisher;