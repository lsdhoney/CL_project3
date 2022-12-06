window.addEventListener("load", () => {

    document.getElementById('enter_btn').addEventListener('click', () => {
        alert("Torturer Sent!");
        let msg = document.getElementById('user_input').value;
        //console.log(msg);
        let obj = { "msg": msg };
        let jsonData = JSON.stringify(obj);
        console.log(jsonData);

        fetch('/msgs', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => { console.log(data) })
    })
})


