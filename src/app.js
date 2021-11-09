const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const bill = document.getElementById("bill");
const person = document.getElementById("person");
const tip = $(".calculator__result--tip");
const total = $(".calculator__result--total");

const inputCustom = $(".calculator__control--custom");
const messError = $(".invalid");
const btnArr = $$(".tip--btn");
const btnReset = $(".btn--reset");
const btnCal = $(".btn--calculator");

let billValue, personValue, tipValue, totalValue;

const app = {
	billValue: 0,
	personValue: 0,
	tipValue: 0,
	totalValue: 0,
	isValidBill: false,
	isValidPerson: false,
	isValidTip: true,
	formValid: false,

	init: function () {
		bill.value = "";
		person.value = "";
		inputCustom.value = "";
		tip.textContent = `$${(0.0).toFixed(2)}`;
		total.textContent = `$${(0.0).toFixed(2)}`;
		this.checkFormValid();
	},

	handlerEvent: function () {
		//Handler BTN tip
		btnArr.forEach((btn, index) => {
			btn.addEventListener("click", () => {
				inputCustom.value = "";
				this.resetBtn(index);
				this.tipValue = parseFloat(btn.value);
			});
		});

		bill.addEventListener("change", (e) => {
			this.isValidBill = this.isNumberValid(bill, parseFloat(e.target.value));
			this.isValidBill
				? (this.billValue = parseFloat(e.target.value))
				: (this.billValue = null);
			this.checkFormValid();
		});

		person.addEventListener("change", (e) => {
			this.isValidPerson = this.isNumberValid(
				person,
				parseFloat(e.target.value)
			);
			this.isValidPerson
				? (this.personValue = parseFloat(e.target.value))
				: (this.personValue = null);
			this.checkFormValid();
		});

		inputCustom.addEventListener("click", () => {
			this.resetBtn();
		});

		inputCustom.addEventListener("change", (e) => {
			this.isValidTip = this.isNumberValid(
				inputCustom,
				parseFloat(e.target.value)
			);
			this.isValidTip
				? (this.tipValue = parseFloat(e.target.value))
				: (this.tipValue = null);
			this.checkFormValid();
		});

		btnReset.addEventListener("click", () => {
			this.resetInvalid();
			this.init();
		});

		btnCal.addEventListener("click", () => {
			if (this.formValid) {
				// this.calculator(this.billValue, this.tipValue, this.personValue);
				this.calculartorAPI(this.billValue, this.tipValue, this.personValue);
			}
			return;
		});
	},

	resetBtn: function (id = -1) {
		btnArr.forEach((btn, index) => {
			index !== id
				? btn.classList.remove("active")
				: btn.classList.add("active");
		});
	},

	calculator: function (billValue, tipValue, personValue) {
		let totalTip = (billValue * tipValue) / 100;
		tipValue = totalTip / personValue;
		totalValue = (billValue + totalTip) / personValue;

		tip.textContent = `$${tipValue.toFixed(2)}`;
		total.textContent = `$${totalValue.toFixed(2)}`;
	},

	calculartorAPI: async function (billValue, tipValue, personValue) {
		let result = await fetch(
			`https://plitter-server.vercel.app/api/calculate?bill=${billValue}&people=${personValue}&tipPercent=${tipValue}`
		);

		let resultData = await result.json();
		tip.textContent = `${resultData.amount.toFixed(2)}`;
		total.textContent = `${resultData.total.toFixed(2)}`;
		console.log(resultData);
	},

	isNumberValid: function (el, value) {
		let invalidEl = $(`#invalid-${el.dataset.index}`);
		if (value <= 0) {
			invalidEl ? (invalidEl.style.display = "block") : null;
			el.classList.toggle("input-invalid");
			return false;
		}

		invalidEl ? (invalidEl.style.display = "none") : null;
		el.classList.remove("input-invalid");
		return true;
	},

	resetInvalid: function () {
		let elInvalid = $$(".invalid");
		let inputInvalid = $$(".input-invalid");
		if (elInvalid.length > 0) {
			elInvalid.forEach((e) => {
				e.style.display = "none";
			});
		}

		if (inputInvalid.length > 0) {
			inputInvalid.forEach((e) => {
				e.classList.remove("input-invalid");
			});
		}
	},

	checkFormValid: function () {
		this.formValid = this.isValidBill && this.isValidPerson && this.isValidTip;
		btnCal.disabled = !this.formValid;
	},

	start: function () {
		app.init();
		app.handlerEvent();
	},
};

app.start();
