const channel = new BroadcastChannel("queue_channel");

const nextBtn1 = document.getElementById("nextBtn1");
const nextBtn2 = document.getElementById("nextBtn2");
const nextBtn3 = document.getElementById("nextBtn3");

const recallBtn1 = document.getElementById("recallBtn1");
const recallBtn2 = document.getElementById("recallBtn2");
const recallBtn3 = document.getElementById("recallBtn3");

const teller1 = document.getElementById("teller-1");
const teller2 = document.getElementById("teller-2");
const teller3 = document.getElementById("teller-3");

const upcomingList = document.getElementById("upcomingList");

////// FOR NEW CALL
nextBtn1.addEventListener("click", () => {
  channel.postMessage({ type: "NEXT_CALL", teller: 1 });
});

nextBtn2.addEventListener("click", () => {
  channel.postMessage({ type: "NEXT_CALL", teller: 2 });
});

nextBtn3.addEventListener("click", () => {
  channel.postMessage({ type: "NEXT_CALL", teller: 3 });
});

////// FOR RECALLING
recallBtn1.addEventListener("click", () => {
  channel.postMessage({ type: "RE_CALL", teller: 1 });
});

recallBtn2.addEventListener("click", () => {
  channel.postMessage({ type: "RE_CALL", teller: 2 });
});

recallBtn3.addEventListener("click", () => {
  channel.postMessage({ type: "RE_CALL", teller: 3 });
});

let queueData = [];

channel.onmessage = (e) => {
  upcomingList.innerHTML = "";
  const msg = e.data;
  queueData = msg.queue;
  console.log(msg);

  teller1.textContent = msg.teller1;
  teller2.textContent = msg.teller2;
  teller3.textContent = msg.teller3;

  queueData.forEach((num) => {
    // Only add non-null tickets
    const li = document.createElement("h4");
    li.textContent = `${num}`;
    li.classList.add("upcoming-card");

    upcomingList.appendChild(li);
  });

  console.log(queueData);
};
