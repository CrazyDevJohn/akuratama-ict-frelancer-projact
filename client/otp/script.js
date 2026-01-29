const inputs = document.querySelectorAll("input");

const handleInput = (index) => {
  const currentInput = document.querySelector(`input:nth-child(${index})`);
  const nextInput = document.querySelector(`input:nth-child(${index + 1})`);

  if (currentInput.value.length >= 1) {
    currentInput.value = currentInput.value.split("")[0];
    nextInput.disabled = false;
    nextInput.focus();
  }

  if (currentInput.value.length === 1 && nextInput) {
    nextInput.disabled = false;
    nextInput.focus();
  }

  const allInputsFilled = Array.from(document.querySelectorAll("input")).every(
    (input) => input.value.length === 1
  );

  const verifyBtn = document.querySelector(".verify");
  verifyBtn.disabled = !allInputsFilled;
};

const handleBackspace = (index, ev) => {
  if (ev.key === "Backspace") {
    const currentInput = document.querySelector(`input:nth-child(${index})`);
    const prevInput = document.querySelector(`input:nth-child(${index - 1})`);
    if (currentInput.value.length === 1 || currentInput.value.length === 0) {
      if (prevInput) {
        currentInput.disabled = true;
        currentInput.value = "";
        prevInput.focus();
      }

      const allInputsFilled = Array.from(
        document.querySelectorAll("input")
      ).every((input) => input.value.length === 1);

      const verifyBtn = document.querySelector(".verify");
      verifyBtn.disabled = !allInputsFilled;
    }
  }
};

const handlePaste = (ev) => {
  const currentInput = document.querySelector(`input:nth-child(1)`);

  if (currentInput.value.length > 1 && currentInput.value.length === 4) {
    const values = currentInput.value.split("");
    for (let i = 0; i <= values.length - 1; i++) {
      const activeInput = document.querySelector(`input:nth-child(${i + 1})`);
      activeInput.value = values[i];
      activeInput.disabled = false;
      activeInput.focus();
    }
  } else {
    const oldValue = currentInput.value.split("")[0];
    currentInput.value = oldValue;
    const nextInput = document.querySelector(`input:nth-child(2)`);
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.disabled = false;
      nextInput.focus();
    }
  }

  const allInputsFilled = Array.from(document.querySelectorAll("input")).every(
    (input) => input.value.length === 1
  );

  const verifyBtn = document.querySelector(".verify");
  verifyBtn.disabled = !allInputsFilled;
};

inputs[0].addEventListener("input", (ev) => {
  handlePaste(ev);
});

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    handleInput(index + 1);
  });
});

inputs.forEach((input, index) => {
  input.addEventListener("keydown", (ev) => {
    handleBackspace(index + 1, ev);
  });
});

// 1234
