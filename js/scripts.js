const horizontal = document.getElementById("horizontal");
const horizontalValue = document.getElementById("horizontal-value");
const vertical = document.getElementById("vertical");
const verticalValue = document.getElementById("vertical-value");
const blur = document.getElementById("blur");
const blurValue = document.getElementById("blur-value");
const spread = document.getElementById("spread");
const spreadValue = document.getElementById("spread-value");
const color = document.getElementById("color");
const colorValue = document.getElementById("color-value");
const opacity = document.getElementById("opacity");
const opacityValue = document.getElementById("opacity-value");
const innerShadow = document.getElementById("inner-shadow");

const preview = document.getElementById("preview");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const rulesField = document.getElementById("rules-field");

class BoxShadowGenerator {

    constructor(
        horizontal,
        horizontalValue,
        vertical,
        verticalValue,
        blur,
        blurValue,
        spread,
        spreadValue,
        color,
        colorValue,
        opacity,
        opacityValue,
        innerShadow,
        preview,
        rule,
        webkitRule,
        mozRule
    ) {
        this.horizontal = horizontal;
        this.horizontalValue = horizontalValue;
        this.vertical = vertical;
        this.verticalValue = verticalValue;
        this.blur = blur;
        this.blurValue = blurValue;
        this.spread = spread;
        this.spreadValue = spreadValue;
        this.color = color;
        this.colorValue = colorValue;
        this.opacity = opacity;
        this.opacityValue = opacityValue;
        this.innerShadow = innerShadow;
        this.preview = preview;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    }

    initialize() {
        this.horizontalValue.value = this.horizontal.value;
        this.verticalValue.value = this.vertical.value;
        this.blurValue.value = this.blur.value;
        this.spreadValue.value = this.spread.value;
        this.colorValue.value = this.hexToRgb(this.color.value);
        this.opacityValue.value = this.opacity.value*100;

        this.applyRule();
        this.showRule();
    }

    applyRule() {
        this.preview.style.boxShadow = `${this.innerShadow.checked ? "inset " : ""}${this.horizontal.value}px ${this.vertical.value}px ${this.blur.value}px ${this.spread.value}px rgba(${this.colorValue.value}, ${this.opacity.value})`
        this.currentRule = this.preview.style.boxShadow;
    }

    showRule() {
        this.rule.innerText = `: ${this.currentRule};`;
        this.webkitRule.innerText = `: ${this.currentRule};`;
        this.mozRule.innerText = `: ${this.currentRule};`;
    }

    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `${r}, ${g}, ${b}`;
    }

    update(){
        this.applyRule();
        this.showRule();
    }
}

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalValue,
    vertical,
    verticalValue,
    blur,
    blurValue,
    spread,
    spreadValue,
    color,
    colorValue,
    opacity,
    opacityValue,
    innerShadow,
    preview,
    rule,
    webkitRule,
    mozRule
)

const inputSizeValidation = (value, min, max) => {
    return Math.min(Math.max(Number(value), min), max);
}

const inputs = [ [horizontal, horizontalValue], [vertical, verticalValue], [blur, blurValue], [spread, spreadValue] ];

inputs.forEach(([slider, output]) => {
    slider.addEventListener("input", ()=>{
        output.value = slider.value;
        boxShadow.update();
    })
    output.addEventListener("input", ()=>{
        output.value = inputSizeValidation(output.value, Number(slider.min), Number(slider.max))
        slider.value = output.value;
        boxShadow.update();
    })
})

document.addEventListener("input", (e) => {
    if (e.target === color) {
        colorValue.value = boxShadow.hexToRgb(color.value);
    }

    if (e.target === opacity) {
        opacityValue.value = opacity.value*100;
    }

    if(e.target === opacityValue) {
        opacityValue.value = inputSizeValidation(opacityValue.value, 0, 100);
        opacity.value = opacityValue.value/100;
    }

    boxShadow.update();
})

rulesField.addEventListener("click", () => {
    navigator.clipboard.writeText(rulesField.innerText);
})

boxShadow.initialize();

