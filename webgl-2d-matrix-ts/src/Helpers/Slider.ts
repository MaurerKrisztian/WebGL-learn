export class Slider {
    slider: any;

    constructor(private readonly id: string,
                private readonly min: number,
                private readonly max: number,
                private readonly name?: string) {
        this.createSlider(id, name);
        this.getSlider(id)
        this.slider.min = min+ ".0";
        this.slider.max = max+ ".0";
        this.slider.step = "0.1"
        this.slider.value = "0.1"
    }

    getValue() {
        return this.slider.value
    }

    getSlider(id: string) {
        this.slider = document.getElementById(id);
        if (!this.slider) {
            throw new Error("slider is undefined: " + id)
        }
    }

    setCallback(cb: any) {
        this.slider.oninput = cb;
    }

    createSlider(id: string, name?: string) {
        var inputContainer = document.createElement('div');
        inputContainer.className = "inputContainer"
        var nameP = document.createElement('span');

        nameP.innerText = name || id;

        const container = document.getElementById('sliderContainer')
        var slider: any = document.createElement("input");
        inputContainer.append(nameP)
        inputContainer.append(slider)
        container.append(inputContainer)
        slider.id = id
        slider.type = 'range';
        // container.prepend(slider);
    }
}
