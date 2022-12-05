const EMPTY_FIELD = "";
const AGE_MULTIPLYER = 5;
const HEIGHT_MULTIPLYER = 6.25;
const WEIGHT_MULTIPLYER = 10;

const maleSwitch = document.getElementById('gender-male');
const inputs = document.querySelectorAll('.input__wrapper input');
const checkBoxes = document.querySelectorAll('.radio .radio__wrapper input');
const activityMinimal = document.getElementById('activity-minimal');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const caloriesNorm = document.getElementById('calories-norm');
const caloriesMinimal = document.getElementById('calories-minimal');
const caloriesMaximal = document.getElementById('calories-maximal');
const resultBlock = document.querySelector('.counter__result');

const activateSubmit = function () {
    for (let input of inputs) {
        input.addEventListener('input', function (evt) {
            evt.preventDefault();
            submitButton.disabled =
                !(inputs[0].value.length > 0 && inputs[1].value.length > 0 && inputs[2].value.length > 0);
        });
    }
};

const activateReset = function () {
    for (let input of inputs) {
        input.addEventListener('input', function (evt) {
            evt.preventDefault();
            resetButton.disabled =
                !(inputs[0].value.length > 0 || inputs[1].value.length > 0 || inputs[2].value.length > 0);
        });
    }
};

const clickReset = function () {
    resetButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        resultBlock.classList.add('counter__result--hidden');
        inputs.forEach(it => it.value = EMPTY_FIELD);
        maleSwitch.checked = true;
        activityMinimal.checked = true;
        resetButton.disabled = true;
        submitButton.disabled = true;
    })
}

const clickSubmit = function () {
    submitButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        resultBlock.classList.remove('counter__result--hidden');
    });
};

const counting = function () {
    submitButton.addEventListener('click', function () {
        let age = AGE_MULTIPLYER * inputs[0].value;
        let height = HEIGHT_MULTIPLYER * inputs[1].value;
        let weight = WEIGHT_MULTIPLYER * inputs[2].value;
        let N = weight + height - age;
        N += (maleSwitch.checked) ? 5 : -161;
        if (checkBoxes[0].checked) {
            N *= 1.2;
        } else if (checkBoxes[1].checked) {
            N *= 1.375;
        } else if (checkBoxes[2].checked) {
            N *= 1.55;
        } else if (checkBoxes[3].checked) {
            N *= 1.725;
        } else if (checkBoxes[4].checked) {
            N *= 1.9;
        }
        caloriesNorm.innerHTML = (N).toFixed(0);
        caloriesMinimal.innerHTML = (N * 0.85).toFixed(0);
        caloriesMaximal.innerHTML = (N * 1.15).toFixed(0);
    });
};

counting();
clickSubmit();
clickReset();
activateReset();
activateSubmit();
