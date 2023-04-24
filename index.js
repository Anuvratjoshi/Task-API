const express = require("express");
const port = 8080


const app = express()
let task = []
let len = task.length
app.use(express.json())
// const mon
app.post("/v1/tasks", (req, res) => {
    // console.log(req.body.tasks.length)
    if (req.body.tasks) {
        let taskArr = req.body.tasks
        let arr = []
        if (taskArr.length) {
            for (let i = 0; i < taskArr.length; i++) {
                let inp = taskArr[i]
                len += 1
                inp["id"] = len
                task.push(inp)
                arr.push({ id: inp.id })

            }
        }
        return res.status(201).json({ tasks: arr })

    }
    else {
        task.push(req.body)
        len += 1
        req.body["id"] = len
        req.body["is_completed"] = false
        // console.log(task)
        res.status(201).json({ id: len })
    }


})

app.get("/v1/tasks", (req, res) => {
    res.status(200).json(task)
})

app.get("/v1/tasks/:id", (req, res) => {
    // console.log(+req.params.id)
    let flag = false
    for (let i = 0; i < task.length; i++) {
        let inp = task[i]
        if (inp.id == +req.params.id) {
            res.status(200).json(inp)
            flag = true
            break
        }
    }
    if (flag == false) {
        res.status(404).json({ error: "There is no task at that id" })
    }
})

app.delete("/v1/tasks/:id", (req, res) => {
    // console.log(+req.params.id)
    let flag = false


    for (let i = 0; i < task.length; i++) {
        let inp = task[i]
        if (inp.id == +req.params.id) {

            task.splice(i, 1)
            flag = true
            break
        }
    }
    if (flag == false || true) {
        return res.status(204).json({ status: 204 })
    }

})

app.delete("/v1/tasks", (req, res) => {
    let idToBeDeletedArr = req.body.tasks
    // console.log(idToBeDeletedArr)
    for (let i = 0; i < task.length; i++) {
        let inp = task[i]
        
        for(let j =0;j<idToBeDeletedArr.length;j++){
            if(parseInt(idToBeDeletedArr[i].id)==inp.id){
                task.splice(i, 1)
            }
        }
    }
    return res.status(204).json({message:"deleted successfully"})
})

app.put("/v1/tasks/:id", (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body)
    let flag = false
    for (let i = 0; i < task.length; i++) {
        let inp = task[i]
        if (inp.id == +req.params.id) {
            console.log(req.body.title, req.body.is_completed)
            if (req.body.title && req.body.is_completed) {
                inp.title = req.body.title
                inp.is_completed = req.body.is_completed
                flag = true
                break
            }
            if (req.body.title && !req.body.s_completed) {
                inp.title = req.body.title
                flag = true
                break

            }
            if (!req.body.title && req.body.s_completed) {
                inp.is_completed = req.body.is_completed
                flag = true
                break
            }
        }
    }
    if (flag == false) {
        return res.status(404).json({ error: "There is no task at that id" })
    }
    else {
        res.status(204).json({ updated: "ok" })
    }
})

// app.post("")
app.listen(port, () => {
    console.log(`server is listening to PORT: ${port}`)
})