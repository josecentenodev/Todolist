const express = require("Express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = new express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://todolistadmin:Test123@cluster0.upsvt.mongodb.net/todolistDB", { useNewUrlParser: true });

const itemsSchemma = {
    name: String
};

const Item = mongoose.model("Item", itemsSchemma);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- hit this to delete an item."
});

const defaultItems = [item1, item2, item3]



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

    Item.find({}, (e, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, e => {
                if (e) {
                    console.log(e);
                } else {
                    console.log("Good job! items has been added!")
                }
            })
            res.redirect("/");
        } else {
            res.render("list", { listTitle: day, itemList: foundItems });
        }
    });


});

app.post("/", (req, res) => {
    let newItemName = req.body.newItem;
    const item = new Item({
        name: newItemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.id;
    Item.findByIdAndRemove(checkedItemId, e => {
        if (!e) {
            console.log("Successfully deleted");
        }
        res.redirect("/");
    })
});


app.listen(3000, () => {
    console.log("Funcionando");
});