const inputs = document.querySelectorAll('.controls input')

function updateControlsValue() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
};

inputs.forEach(input => input.addEventListener('change', updateControlsValue));
inputs.forEach(input => input.addEventListener('mousemove', updateControlsValue));