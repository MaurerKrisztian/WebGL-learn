export class Slider {
    slider: any;

    constructor(id: string, min: number, max: number) {
        this.getSlider(id)
        this.slider.min = min;
        this.slider.max = max;
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
}
