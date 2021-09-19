const express = require("Express");
const ejs = require("ejs");
const app = new express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

let items = [];

app.get("/", function(req, res) {

    let today = new Date()
        // let dayIndex = date.getDay()
        // const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        // let day = dayList[dayIndex]
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, itemList: items });

});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Funcionando");
});