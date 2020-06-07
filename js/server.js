


/**
 *  设置appkey
 *  http://www.apicloud.com/appoverview
 *  M.setAttribute("appid","A6032931027980")
 *  M.setAttribute("appkey","xxx")
 */


userInfo = M.getAttribute("userInfo")

if (!userInfo || !userInfo.appid || !userInfo.appkey) {
    location.href = M.baseUrl + "login_page/index.html";
} else {
    document.title = userInfo.username
}

const mi_resource = new MiApiCloudClient(userInfo.appid, userInfo.appkey).tableClient("mi_resource");

app.begin((req, res) => {
    req.params.username = userInfo.username
   // console.log("begin:", req)
})

MiApiCloudClient.begin=d=>{
   // console.log(d)
}



/**
 * 后端使用
 */
app.post("/listByPage", async function (req, res) {
    
    let whereCase = { parent_id: req.params.parent_id, name: { "like": req.params.name || "" }, username: userInfo.username };

    if(req.params.page){
        req.params.page=(req.params.page-1)*req.params.rows;
    }else{
        mi_resource.list(whereCase).then(d => {
            let result = { rows: d  }
            res.send(result);
        })
        return;
    }

    mi_resource.list(whereCase, req.params.rows, req.params.page).then(
        d => {
            mi_resource.count(whereCase).then(d1 => {
                let result = { rows: d, total: d1.count }
                //console.log("-------->", result)
                res.send(result);
            })
        });
});

app.post("/listAllRoot", async function (req, res) {
    mi_resource.list({ parent_id: "-1", username: userInfo.username }).then(d => res.send(d))
});

app.get("/listAll", async function (req, res) {
    res.send(new Promise((r) => {
        mi_resource.list({ username: userInfo.username }).then(d => r(d))
    }))
});



app.post("/add", async function (req, res) {
    mi_resource.add(req.params).then(d => {
        res.send("ok")
    })
});


app.post("/update", async function (req, res) {

    mi_resource.update(req.params).then(d => {
        res.send("ok")
    })
});


//存储过程遍历数组
app.get("/delete", async function (req, res) {
    for (let j = 0; j < req.params.ids.length; j++) {
        req.params.id = req.params.ids[j] || -2;
        await mi_resource.delete({ id: req.params.id })
        mi_resource.list({ parent_id: req.params.id }).then(
            async  d => {
                //console.log(d)
                for (let i = 0; i < d.length; i++) {
                    await mi_resource.delete({ id: d[i].id })
                }

            }
        )
    }
    res.send("ok")
}

);


