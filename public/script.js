const API = "/tasks";

async function loadTasks() {
    let url = API;

    const status = document.getElementById("filterStatus").value;
    const search = document.getElementById("search").value;

    let query = [];

    if (status) query.push(`status=${status}`);
    if (search) query.push(`search=${search}`);

    if (query.length > 0) {
        url += "?" + query.join("&");
    }

    const res = await fetch(url);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.status === "Completed") {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <strong>ID:</strong> ${task.id}<br>
            <strong>${task.title}</strong> - ${task.status}<br>
            <small>${task.description}</small><br>

            <button onclick="markComplete(${task.id})">✔</button>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;

        list.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    if (!title) {
        alert("Title is required");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, status })
    });

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

async function markComplete(id) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Completed" })
    });

    loadTasks();
}

loadTasks();