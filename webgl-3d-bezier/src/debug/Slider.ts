export class Slider {
    slider: any;
    valueHtml;

    constructor(private readonly id: string,
                private readonly min: number,
                private readonly max: number,
                private readonly step: number = 0.1,
                private readonly name?: string) {
        this.createSlider(id, name);
        this.getSlider(id)
        this.slider.min = min+ ".0";
        this.slider.max = max+ ".0";
        this.slider.step = step.toString()
        this.slider.value = step.toString() || "0.1"
    }

    getValue() {
        return this.slider.value
    }

    getFloatValue() {
        return Number.parseFloat(this.getValue())
    }

    setValueText(txt: number) {
        this.valueHtml.innerText = txt.toString();
    }

    getSlider(id: string) {
        this.slider = document.getElementById(id);
        if (!this.slider) {
            throw new Error("slider is undefined: " + id)
        }
    }

    setCallback(cb: any) {
        this.slider.oninput =()=>{
            this.setValueText(this.getFloatValue())
            cb()
        }
    }

    createSlider(id: string, name?: string) {
        var inputContainer = document.createElement('div');
        inputContainer.className = "inputContainer"
        var nameP = document.createElement('span');

        var value = document.createElement('span');
        value.innerText = ""
        this.valueHtml = value;

        nameP.innerText = name || id;

        const container = document.getElementById('sliderContainer')
        var slider: any = document.createElement("input");
        inputContainer.append(nameP)
        inputContainer.append(slider)
        inputContainer.append(value)
        container.append(inputContainer)
        slider.id = id
        slider.type = 'range';
        // container.prepend(slider);
    }
}
