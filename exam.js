let public_key = [143, 7];
let private_key = [143, 103];
let history = [];

function encrypt(word) {
    let crypt = '';
    for (let i = 0; i < word.length; i++) {
        let asc = word.charCodeAt(i);
        let de = (asc ** public_key[1]) % public_key[0];
        crypt += de + ' ';
    }
    return crypt;
}

function decrypt(arr) {
    let crypt = '';
    for (let code = 0; code < arr.length; code++) {
        let asc = Number(arr[code]);
        let dec = (BigInt(asc) ** BigInt(private_key[1])) % BigInt(private_key[0]);
        let char = String.fromCharCode(dec.toString());
        crypt += char;
    }
    return crypt;
}

function encode() {
    let a = document.getElementById("prompt").value;
    let encrypted = encrypt(a);
    document.getElementById("demo").innerHTML = encrypted;
    history.push(a);
}

function decode() {
    let b = document.getElementById("cypher").value;
    let inputText = decrypt(b.split(" "));
    processInput(inputText, "output");
}

function toggleSidebar() {
    const sidebarContainer = document.getElementById("sidebar-container");
    const body = document.body;

    if (sidebarContainer.style.display === "block") {
        sidebarContainer.style.display = "none";
        body.classList.remove("sidebar-open");
    } else {
        sidebarContainer.style.display = "block";
        body.classList.add("sidebar-open");

        const historyContent = document.getElementById("history-content");
        historyContent.innerHTML = "<h3>Encryption History:</h3>";
        history.forEach((code, index) => {
            historyContent.innerHTML += `<p><strong>Input ${index + 1}:</strong> <br> <p id="hist">${code.replace(/\n/g, "<br>")}</p></p>`;
        });
    }
}

function closeSidebar(event) {
    const sidebarContainer = document.getElementById("sidebar-container");
    const body = document.body;

    if (event.target === sidebarContainer) {

        sidebarContainer.style.display = "none";
        body.classList.remove("sidebar-open");
    }
}

let debounceTimer;
function live() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
        let inputText = document.getElementById("prompt").value;
        processInput(inputText, "demo");
    }, 300);
}

function processInput(inputText, id) {
    const prompt = inputText.split('?');
    const question = prompt[0].trim();
    const options = [];
    if (prompt.length > 1) {
        const lines = prompt[1].split('\n');
        for (let i = 0; i < lines.length; i++) {
            const option = lines[i].trim();
            if (option.length > 0) {
                options.push(option);
            }
        }
    }
    if (question && options.length > 0) {

        const outputDiv = document.getElementById(id);
        latex(question, id);

        options.forEach((option, index) => {
            let label = document.createElement("label");
            let input = document.createElement("input");
            let br = document.createElement("br");
            input.type = "radio";
            input.name = "options";
            label.id = `${index}fsd`;
            label.appendChild(br);
            label.appendChild(input)
            outputDiv.appendChild(label);
            latex2(option, `${index}fsd`);
        });
    } else {
        const outputDiv = document.getElementById(id);
        latex(inputText, id);
    }
}
function latex(latexInput, id) {
    const outputElement = document.getElementById(id);
    outputElement.innerHTML = "";
    const p = document.createElement("p");
    let str = ''
    const latexSpan = document.createElement("p");
    latexSpan.innerHTML = latexInput.replace(/\n/g, "<br>");

    outputElement.append(latexSpan);

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, latexSpan]);
}

function latex2(latexInput, id) {
    const outputElement = document.getElementById(id);
    const br = document.createElement("br");

    const latexSpan = document.createElement("span");
    latexSpan.textContent = latexInput;

    outputElement.appendChild(latexSpan);
    outputElement.appendChild(br);


    MathJax.Hub.Queue(["Typeset", MathJax.Hub, latexSpan]);
}

window.onclick = function (event) {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    if (event.target === sidebar && sidebar.style.display === "block") {
        sidebar.style.display = "none";
        body.classList.remove("sidebar-open");
    }
};
function toggleChatbox() {
    const chatboxContainer = document.getElementById("chatbox-container");
    const feedbackButton = document.getElementById("feedback-button");

    if (chatboxContainer.style.display === "block") {
        chatboxContainer.style.display = "none";
        feedbackButton.style.display = "block"; 
    } else {
        chatboxContainer.style.display = "block";
        feedbackButton.style.display = "none"; 
    }
}


function addChatMessage(message) {
    const chatboxContent = document.getElementById("chatbox-content");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message;
    chatboxContent.appendChild(messageElement);
    chatboxContent.scrollTop = chatboxContent.scrollHeight;
}

function handleChatInput() {
    const chatboxInput = document.getElementById("chatbox-input");
    const userMessage = chatboxInput.value.trim();
    if (userMessage !== "") {
        addChatMessage(`<b>User</b>: ${userMessage}<br>`);

        chatboxInput.value = ""; 
    }
}

document.getElementById("chatbox-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        handleChatInput();
    }
});
