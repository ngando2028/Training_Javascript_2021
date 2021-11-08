const bill = document.getElementById("bill");
const person = document.getElementById("person");
const tip = document.querySelector(".calcultor__result--tip");
const total = document.querySelector(".calcultor__result--total");
const btnArr = document.querySelectorAll(".tip--btn");
const btnReset = document.querySelector(".btn--reset");
const inputCustom = document.querySelector(".calculator__control--custom");
const messError = document.querySelector(".invalid");

let billValue, personValue, tipValue, totalValue;

const init = function () {
	bill.value = "";
	person.value = "";
	tip.textContent = `$${(0.0).toFixed(2)}`;
	total.textContent = `$${(0.0).toFixed(2)}`;
};
init();

btnArr.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		tipValue = +btn.value;
		btn.classList.toggle("active");
		if (billValue && personValue) {
			cal(billValue, tipValue, personValue);
		}
	});
});

function isNumeric(num) {
	return !isNaN(num) && isFinite(num);
}

bill.addEventListener("change", (e) => {
	if (isNumeric(+e.target.value)) billValue = +e.target.value;
	tipValue = tipValue || 0;
	if (personValue && isNumeric(personValue)) {
		cal(billValue, tipValue, personValue);
	} else return console.log(`Can't be zero`);
});

function cal(billValue, tipValue, personValue) {
	if (tipValue !== 0) {
		let totalTip = (billValue * tipValue) / 100;
		tipValue = totalTip / personValue;
		totalValue = (billValue + totalTip) / personValue;
	} else {
		totalValue = billValue / personValue;
	}

	tip.textContent = `$${tipValue.toFixed(2)}`;
	total.textContent = `$${totalValue.toFixed(2)}`;
	console.log(tip.textContent, total.textContent);
}

person.addEventListener("change", (e) => {
	if (isNumeric(+e.target.value)) {
		messError.style.display = "none";
		person.classList.toggle("input-invalid");
		tipValue = tipValue || 0;
		personValue = +e.target.value;
		if (billValue && isNumeric(billValue)) {
			cal(billValue, tipValue, personValue);
		}
	} else {
		messError.style.display = "block";
		person.classList.toggle("input-invalid");
	}
});

btnReset.addEventListener("click", () => {
	init();
});

inputCustom.addEventListener("change", (e) => {
	if (isNumeric(+e.target.value)) tipValue = +e.target.value;
	if (
		billValue &&
		personValue &&
		isNumeric(billValue) &&
		isNumeric(personValue)
	) {
		cal(billValue, tipValue, personValue);
	}
});
