const channel = new BroadcastChannel("queue_channel");

const btnClg = document.getElementById("clg");
const btnSh = document.getElementById("sh");
const btnJh = document.getElementById("jh");
const btnGn = document.getElementById("gn");

const UserNum = document.getElementById("userNum");
const checkbox = document.getElementById("checkbox");

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("continue");

let lastNumber = localStorage.getItem("lastNumber") || 0;

let prioNum = 1;

/// FOR COLLAGE BUTTON
btnClg.addEventListener("click", () => {
  let numUserFinal = "";

  modal.classList.add("show");

  const newNumber = ++lastNumber;
  localStorage.setItem("lastNumber", newNumber);

  if (checkbox.checked) {
    numUserFinal = `C- ${newNumber} P ${prioNum}`;
    prioNum++;
  } else {
    numUserFinal = `C- ${newNumber}`;
  }

  UserNum.textContent = numUserFinal;

  channel.postMessage({
    type: "NEW_TICKET",
    transac: "c",
    number: numUserFinal,
    isSenior: checkbox.checked,
  });

  checkbox.checked = false;
});

/// FOR JUNIOR HIGH BUTTON
btnJh.addEventListener("click", () => {
  let numUserFinal = "";

  modal.classList.add("show");

  const newNumber = ++lastNumber;
  localStorage.setItem("lastNumber", newNumber);

  if (checkbox.checked) {
    numUserFinal = `JH- ${newNumber} P ${prioNum}`;
    prioNum++;
  } else {
    numUserFinal = `JH- ${newNumber}`;
  }

  UserNum.textContent = numUserFinal;

  channel.postMessage({
    type: "NEW_TICKET",
    transac: "jh",
    number: numUserFinal,
    isSenior: checkbox.checked,
  });

  checkbox.checked = false;
});

/// SENIOR HIGH BUTTON
btnSh.addEventListener("click", () => {
  let numUserFinal = "";

  modal.classList.add("show");

  const newNumber = ++lastNumber;
  localStorage.setItem("lastNumber", newNumber);

  if (checkbox.checked) {
    numUserFinal = `SH- ${newNumber} P ${prioNum}`;
    prioNum++;
  } else {
    numUserFinal = `SH- ${newNumber}`;
  }

  UserNum.textContent = numUserFinal;

  channel.postMessage({
    type: "NEW_TICKET",
    transac: "sh",
    number: numUserFinal,
    isSenior: checkbox.checked,
  });

  checkbox.checked = false;
});

/// FOR GENERAL BUTTON
btnGn.addEventListener("click", () => {
  let numUserFinal = "";

  modal.classList.add("show");

  const newNumber = ++lastNumber;
  localStorage.setItem("lastNumber", newNumber);

  if (checkbox.checked) {
    numUserFinal = `GN- ${newNumber} P ${prioNum}`;
    prioNum++;
  } else {
    numUserFinal = `GN- ${newNumber}`;
  }

  UserNum.textContent = numUserFinal;

  channel.postMessage({
    type: "NEW_TICKET",
    transac: "gn",
    number: numUserFinal,
    isSenior: checkbox.checked,
  });

  checkbox.checked = false;
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
