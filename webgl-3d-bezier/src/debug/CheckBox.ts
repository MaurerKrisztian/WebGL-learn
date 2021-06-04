export class CheckBox {


    checkBoxElement: any;
    valueHtml;

    constructor(private readonly id: string,
                private readonly name?: string) {
        this.create(id, name);
        this.getSlider(id)

        // this.checkBoxElement.value = false
    }

    getValue() {
        return this.checkBoxElement.checked
    }

    getFloatValue() {
        return Number.parseFloat(this.getValue())
    }

    setValueText(txt: number) {
        this.valueHtml.innerText = txt.toString();
    }

    getSlider(id: string) {
        this.checkBoxElement = document.getElementById(id);
        if (!this.checkBoxElement) {
            throw new Error("slider is undefined: " + id)
        }
    }

    setCallback(cb: any) {
        this.checkBoxElement.oninput =()=>{
            this.setValueText(this.getFloatValue())
            cb()
        }
    }

    create(id: string, name?: string) {
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
        slider.type = 'checkbox';
        // container.prepend(slider);
    }

}
