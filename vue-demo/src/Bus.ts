type BusClass = {
    emit: (name: string) => void
    on: (name: string, callback: Function) => void
}

class Bus implements BusClass{
    emit() {

    }
    on() {
        
    }
}