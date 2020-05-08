+async function () {
	M = await new Promise((v) => require('https').get("https://minglie.github.io/js/ming_node.js", (q) => { d = ''; q.on('data', (a) => d += a); q.on('end', () => v(eval(d))) }))
	//url = require("url");

	var app = M.server();
	app.set("views", "./")
	app.listen(8888);

	app.get("/", async (req, res) => {
		res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
		res.write(`
		  <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/min/vs/loader.js"></script>
    <script>
        M = {}
    </script>
    <script src="https://minglie.gitee.io/mingpage/static/smalltool/share_edit/static/launge_default_value.js"></script>
    <style>
        #resize {
            width: 5px;
            height: 10px;
        }

        option {
            font-weight: bold;
            font-size: large;
            color: #00b4ef;
        }
    </style>
</head>

<body>
    <div>
        <select id="laungeSelectId" class="form-control" style="width:10%; float: left;" onchange="selectOnchang(this)">
            <option>javascript</option>
            <option>abap</option>
            <option>aes</option>
            <option>apex</option>
            <option>azcli</option>
            <option>bat</option>
            <option>c</option>
            <option>cameligo</option>
            <option>clojure</option>
            <option>coffeescript</option>
            <option>cpp</option>
            <option>csharp</option>
            <option>csp</option>
            <option>css</option>
            <option>dockerfile</option>
            <option>fsharp</option>
            <option>go</option>
            <option>graphql</option>
            <option>handlebars</option>
            <option>html</option>
            <option>ini</option>
            <option>java</option>
            <option>json</option>
            <option>kotlin</option>
            <option>less</option>
            <option>lua</option>
            <option>markdown</option>
            <option>mips</option>
            <option>msdax</option>
            <option>mysql</option>
            <option>objective-c</option>
            <option>pascal</option>
            <option>pascaligo</option>
            <option>perl</option>
            <option>pgsql</option>
            <option>php</option>
            <option>plaintext</option>
            <option>postiats</option>
            <option>powerquery</option>
            <option>powershell</option>
            <option>pug</option>
            <option>python</option>
            <option>r</option>
            <option>razor</option>
            <option>redis</option>
            <option>redshift</option>
            <option>restructuredtext</option>
            <option>ruby</option>
            <option>rust</option>
            <option>sb</option>
            <option>scheme</option>
            <option>scss</option>
            <option>shell</option>
            <option>sol</option>
            <option>sql</option>
            <option>st</option>
            <option>swift</option>
            <option>tcl</option>
            <option>twig</option>
            <option>typescript</option>
            <option>vb</option>
            <option>xml</option>
            <option>yaml</option></select>
        </select>
        <div align="center">
            <button id="btn" style="float: left; width: 80%; height: 35px;" align="center" type="button" class="btn btn-success btn-lg btn-block">Run</button>
        </div>
        <select  id="themeSelectId"  class="form-control" style="width: 10%; float: right;"  onchange="selectOnThemechang(this)">
            <option>vs</option>
            <option>vs-dark</option>
            <option>hc-black</option>
        </select>
 
    </div>
 
     
    <div id="container" style="width:100%;height:2000px;float:left; border:1px solid grey"></div>
    <script>
        M.language =localStorage.language || "javascript"
        M.theme=localStorage.theme || "vs-dark";  
       
        require.config({
            baseUrl: 'https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/', paths: { 'vs': 'min/vs' }
        });

        function selectOnchang(d) {
            localStorage.language=d.value;
            M.language = d.value;
            $("#container").children().remove();
            $.ajax({
                type: "GET",
                url: "__ming_file." + M.language + ".txt",
                async: false,
                success: function (data) {
                    if (data == "no router") {
                        data = null;
                    }
                    require(['vs/editor/editor.main'], function () {
                    
                        var editor = monaco.editor.create(document.getElementById('container'), {
                            value: [
                                data || M.laungeInitValue[M.language]
                            ].join('\\n'),
                            language: M.language,
                            theme: M.theme,
                            automaticLayout: true,
                            scrollbar: {
                                useShadows: false,
                                vertical: 'visible',
                                horizontal: 'visible',
                                horizontalSliderSize: 5,
                                verticalSliderSize: 5,
                                horizontalScrollbarSize: 15,
                                verticalScrollbarSize: 15,
                            },
                            quickSuggestions: true,
                            overviewRulerBorder: true,
                            minimap: {
                                enabled: false
                            }
                        });
                        M.editor = editor;
                        if( $("#themeSelectId").val()!=M.theme){
                            $("#themeSelectId").val(M.theme) 
                            selectOnThemechang({ value: M.theme })
                        }
                    }
                    );
                }, error: function () {
                    require(['vs/editor/editor.main'], function () {

                        var editor = monaco.editor.create(document.getElementById('container'), {
                            value: [
                                M.laungeInitValue[M.language]
                            ].join('\\n'),
                            language: M.language,
                            theme: M.theme,
                            automaticLayout: true,
                            scrollbar: {
                                useShadows: false,
                                vertical: 'visible',
                                horizontal: 'visible',
                                horizontalSliderSize: 5,
                                verticalSliderSize: 5,
                                horizontalScrollbarSize: 15,
                                verticalScrollbarSize: 15,
                            },
                            quickSuggestions: true,
                            overviewRulerBorder: true,
                            minimap: {
                                enabled: false
                            }
                        });
                        M.editor = editor;

                        if( $("#themeSelectId").val()!=M.theme){
                            $("#themeSelectId").val(M.theme) 
                            selectOnThemechang({ value: M.theme })
                        }


                    }
                    );
                }
            });
        }

       function selectOnThemechang(d){
            M.theme=d.value;  
            localStorage.theme= M.theme;
            monaco.editor.setTheme(M.theme);
        }

    
        function ming_alert(str) {
            btn.innerHTML = str;
            window.setTimeout(() => {
                btn.innerHTML = "Run";
            }, 500);
        }
        btn.onclick = function () {
            let fun = M.editor.getValue();
            localStorage.fun = fun;
            $.ajax({
                type: "post",
                url: "/_run_?language=" + M.language,
                data: { fun },
                dataType: "json",
                success: function (data) {
                    ming_alert(JSON.stringify(data));
                },
                error: function (e) {
                    ming_alert(JSON.stringify(e));
                }
            });
        }

        $("#laungeSelectId").val(M.language)
        selectOnchang({value:M.language})
        console.log(M.language,M.theme);
    </script>
</body>

</html>
		`
		);
		res.end();
	})
	
	
	
	
	
	app.post("/_run_", async (req, res) => {
        try {
            M.writeFile("./__ming_file." + req.params.language + ".txt", req.params.fun);
            if (req.params.language == "javascript") {
                eval(req.params.fun)
            }
            res.send(M.result("ok"))

        } catch (e) {
            res.send(M.result("error", false))
        }
    })

    eval(M.readFile("./__ming_file.javascript.txt"))
	
	
}();