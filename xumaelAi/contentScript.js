chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const div = document.createElement('div');
    div.setAttribute('id', 'xumaelNotif');
    div.style.backgroundColor = '#251b00'; // set background color to gold (yellowish tint)
    div.style.color = 'white';  // Change text color to white
    div.style.position = 'fixed';
    div.style.padding = '20px';
    div.style.borderRadius = '20px';
    div.style.width = '350px';
    div.style.zIndex = '99999';
    div.style.left = '50%';
    div.style.top = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.boxSizing = 'border-box';
    div.innerHTML = `<span id="xumaelClose" style="float:right;cursor:pointer;color:navajowhite;">X</span> Loading...`; // Change X color to black for visibility
    document.body.appendChild(div);

    document.getElementById("xumaelClose").addEventListener('click', function() {
        document.body.removeChild(div);
    });

    var message = "Make this word/sentence as easy as possible. Explain it in 2/3 lines maximum. " + request.text;
    var messages = [{ "role": "user", "content": message }];

    //put API link here:
    fetch('https://geniusai.waveai-20.repl.co/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

            //put API key here:
            'Authorization': ''
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: messages
        }),
    })
        .then(response => response.json())
        .then(data => {
            div.innerHTML = `<span id="xumaelClose" style="float:right;cursor:pointer;color:black;">X</span> ${data.choices[0].message.content}`;
            document.getElementById('xumaelClose').addEventListener('click', function() {
                document.body.removeChild(div);
            });
        });
});
