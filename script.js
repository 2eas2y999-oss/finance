// ------------------ Load Records from LocalStorage ------------------
if (!localStorage.getItem("records")) {
    localStorage.setItem("records", JSON.stringify([]));
}

let records = JSON.parse(localStorage.getItem("records"));


// =======================
// 1. Code for INDEX PAGE
// =======================

// Only run this part when total-spent exists
if (document.getElementById("total-spent")) {

    let totalSpent = records.reduce((sum, item) => sum + item.amount, 0);

    let currentMonth = new Date().getMonth();
    let monthSpent = records
        .filter(item => new Date(item.date).getMonth() === currentMonth)
        .reduce((sum, item) => sum + item.amount, 0);

    document.getElementById("total-spent").textContent = totalSpent.toFixed(2);
    document.getElementById("month-spent").textContent = monthSpent.toFixed(2);
}



// =======================
// 2. Code for RECORDS PAGE
// =======================

// ---------- Add New Record ----------
const form = document.getElementById("record-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let desc = document.getElementById("desc").value;
        let amount = parseFloat(document.getElementById("amount").value);
        let date = document.getElementById("date").value;

        let newRecord = { desc, amount, date };

        records.push(newRecord);
        localStorage.setItem("records", JSON.stringify(records));

        location.reload();
    });
}


// ---------- Display Table ----------
const tableBody = document.querySelector("#record-table tbody");

if (tableBody) {
    records.forEach(r => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${r.desc}</td>
            <td>${r.amount.toFixed(2)}</td>
            <td>${r.date}</td>
        `;
        tableBody.appendChild(row);
    });
}
// =======================
// 3. Code for GOALS PAGE
// =======================

// If goals not exist, initialize
if (!localStorage.getItem("goals")) {
    localStorage.setItem("goals", JSON.stringify([]));
}

let goals = JSON.parse(localStorage.getItem("goals"));


// ---------- Add New Goal ----------
const goalForm = document.getElementById("goal-form");

if (goalForm) {
    goalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("goal-name").value;
        let target = parseFloat(document.getElementById("goal-target").value);
        let current = parseFloat(document.getElementById("goal-current").value);

        let newGoal = { name, target, current };

        goals.push(newGoal);
        localStorage.setItem("goals", JSON.stringify(goals));

        location.reload();
    });
}


// ---------- Display Goals ----------
const goalTable = document.querySelector("#goal-table tbody");

if (goalTable) {
    goals.forEach(g => {
        let percent = (g.current / g.target) * 100;
        if (percent > 100) percent = 100;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${g.name}</td>
            <td>RM ${g.current.toFixed(2)}</td>
            <td>RM ${g.target.toFixed(2)}</td>
            <td>${percent.toFixed(1)}%</td>
        `;
        goalTable.appendChild(row);
    });
}
