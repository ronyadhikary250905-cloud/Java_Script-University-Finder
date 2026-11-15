
const url = "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

let allUniversities = [];

let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("#country").value.trim();
    let state = document.querySelector("#state").value.trim();

    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Loading...";

    try {
        // Fetch university dataset
        if (allUniversities.length === 0) {
            let res = await axios.get(url);
            allUniversities = res.data;
        }

        // Filter by country
        let results = allUniversities.filter(col =>
            col.country.toLowerCase() === country.toLowerCase()
        );

        // Filter by state
        if (state) {
            results = results.filter(col =>
                col["state-province"] &&
                col["state-province"].toLowerCase().includes(state.toLowerCase())
            );
        }

        console.log("Universities found:", results);

        show(results);

    } catch (error) {
        console.error("Error:", error);
        document.querySelector("#list").innerText =
            "Unable to load university data. Please try again.";
    }

    btn.disabled = false;
    btn.innerText = "Get Universities";
});


function show(colArr) {
    let list = document.querySelector("#list");
    list.innerHTML = "";

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


