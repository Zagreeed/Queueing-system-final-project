class PriorityQueue {
  constructor() {
    this.MAX = 100;
    this.queue = new Array(this.MAX).fill(null);
    this.size = 0;
  }

  // Lower priority number = higher precedence

  getPriority(str) {
    // Check if string ends with "P" followed by a number
    const match = String(str).match(/P\s*(\d+)$/);
    if (match) {
      return parseInt(match[1]); // Return the numeric value
    }
    return Number.MAX_SAFE_INTEGER; // Default to lowest priority if no priority found
  }

  // Enqueue with priority: Lower priority number = higher precedence
  enqueue(item, isSenior = false) {
    if (this.size === this.MAX) {
      console.log("Queue is FULL. Cannot enqueue.");
      return;
    }

    // Get base priority from the ticket format
    let itemPriority = this.getPriority(item);

    let i;
    for (i = this.size - 1; i >= 0; i--) {
      const currentPriority = this.getPriority(this.queue[i]);
      if (currentPriority <= itemPriority) {
        break; // Found the right position
      }
      this.queue[i + 1] = this.queue[i]; // Shift elements with lower precedence
    }

    this.queue[i + 1] = item;
    this.size++;
    console.log(`"${item}" added to the queue with priority: ${itemPriority}.`);
  }

  // Dequeue the element with the highest priority (front)
  dequeue() {
    if (this.size === 0) {
      console.log("Queue is EMPTY. Cannot dequeue.");
      return null;
    }

    const item = this.queue[0];
    console.log(`"${item}" removed from the queue.`);

    for (let i = 1; i < this.size; i++) {
      this.queue[i - 1] = this.queue[i];
    }

    this.size--;
    return item;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.size === 0;
  }

  // Get the front element without removing it
  peek() {
    if (this.size === 0) {
      return null;
    }
    return this.queue[0];
  }

  // Get all elements as an array for display purposes
  getAll() {
    return this.queue.slice(0, this.size);
  }
}

const channel = new BroadcastChannel("queue_channel");

const teller1 = document.getElementById("teller1");
const teller2 = document.getElementById("teller2");
const teller3 = document.getElementById("teller3");

const upcomingList = document.getElementById("upcomingList");

let ticketQueue = new PriorityQueue();

///////////////////// Updated function to display the queue in the UI
function updateList() {
  upcomingList.innerHTML = "";

  const allTickets = ticketQueue.getAll();

  // Add each ticket to the list
  allTickets.forEach((num) => {
    if (num) {
      // Only add non-null tickets
      const li = document.createElement("h4");
      li.textContent = `${num}`;
      li.classList.add("upcoming-card");

      upcomingList.appendChild(li);
    }
  });
}

////////////////////// Handle messages from the channel
channel.onmessage = (e) => {
  const msg = e.data;
  console.log(msg);

  if (msg.type === "NEW_TICKET") {
    // Add ticket to the queue with appropriate priority
    ticketQueue.enqueue(msg.number, msg.isSenior);
    updateList();
  } else if (msg.type === "NEXT_CALL") {
    // Get next ticket from the queue
    const next = ticketQueue.dequeue() || "None";

    // Handle teller assignment and announcements
    if (msg.teller == 1) {
      teller1.textContent = next;
      if (next !== "None" && next !== "undefined") {
        announceTicket(next, "one");
      } else {
        teller1.textContent = "None";
      }
    } else if (msg.teller == 2) {
      teller2.textContent = next;
      if (next !== "None" && next !== "undefined") {
        announceTicket(next, "two");
      } else {
        teller2.textContent = "None";
      }
    } else if (msg.teller == 3) {
      teller3.textContent = next;
      if (next !== "None" && next !== "undefined") {
        announceTicket(next, "Three");
      } else {
        teller3.textContent = "None";
      }
    }
    updateList();
  }

  if (msg.type == "RE_CALL") {
    reCallAnounce(msg.teller);
  }

  channel.postMessage({
    type: "QUEUQ_DATA",
    queue: ticketQueue.getAll(),
    teller1: teller1.textContent,
    teller2: teller2.textContent,
    teller3: teller3.textContent,
  });
};

/////////////////// Re anounce function
function reCallAnounce(teller) {
  // const value = teller1.textContent;
  let value = "";

  if (teller == 1) {
    value = teller1.textContent;
  } else if (teller == 2) {
    value = teller2.textContent;
  } else if (teller == 3) {
    value = teller3.textContent;
  }

  if (value != "None") {
    const msg = new SpeechSynthesisUtterance(
      "           Calling number " +
        value +
        "Please proceed to teller " +
        teller
    );

    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[44];

    msg.rate = 1.0; // Speed (0.1 to 10)
    msg.pitch = 0.7; // Pitch (0 to 2)
    msg.volume = 1.0;

    window.speechSynthesis.speak(msg);
  }
}

////////////////// function for announcing tickets
function announceTicket(ticketNumber, tellerNumber) {
  const msg = new SpeechSynthesisUtterance(
    " Calling number " +
      ticketNumber +
      "Please proceed to teller " +
      tellerNumber
  );
  const voices = window.speechSynthesis.getVoices();
  msg.voice = voices[44];
  msg.rate = 1.0; // Speed (0.1 to 10)
  msg.pitch = 0.7; // Pitch (0 to 2)
  msg.volume = 1.0;
  window.speechSynthesis.speak(msg);
}

//////////////////// Live Clock
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();
