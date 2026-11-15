

let url = "https://universities.hipolabs.com/search?country=";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("#country").value.trim();
    let state = document.querySelector("#state").value.trim();
    
console.log(country);
console.log(state);
    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    let colArr = await getColleges(country);

    // Filter state/province locally
    if (state) {
        colArr = colArr.filter(col =>
            col["state-province"] &&
            col["state-province"].toLowerCase().includes(state.toLowerCase())
        );
    }

    show(colArr);
});

async function getColleges(country) {
    try {
        let res = await axios.get(
            url + encodeURIComponent(country)
        );

        return res.data;
    } catch (e) {
        console.log("Error:", e);
        return [];
    }
}

function show(colArr) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (colArr.length === 0) {
        list.innerText =
            "No matching universities found. Try another search.";
        return;
    }

    for (let col of colArr) {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    }
}