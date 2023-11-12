const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const fs = require('fs');
//const { response } = require('express');

const serverPort = 3010;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'esgDB',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Transforms
//Shuffle used on feed items to prevent repeditive feed
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

app.get('/', (req,res) => {
    res.send(
        'server running on port: ' + serverPort
    );
});

//User information API
//Checks login info
app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    

    const sqlCheckUserDetail = "SELECT password, firstname FROM esgDB.tblUser where username = (?)";
    
    db.query(sqlCheckUserDetail, [username], (err,result) => {
        if(result && result.length > 0){ //user found check password
            if(password === result[0].password){
                console.log(username + ' successful login');
                console.log(result[0].firstname);
                res.send({
                    userexists: true,
                    access: true,  
                    name: result[0].firstname  
                }) 
            }else{
                console.log(username + ' failed login');
                res.send({
                    userexists: true,
                    access: false
                })
            }
        }else{ //no user by that name return error
            console.log(username + ' does not exist');
            res.send({
                userexists: false
            });
        }
    });
    
});

//Registers user and logs them in if user name availible
app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;

    console.log('\nAttempting Registrationw with details:\nUsername: '+username+'\nPassword: '+password+'\nFirstname: '+firstname+'\n\n');

    const sqlCheckUserExist = "SELECT firstname FROM esgDB.tblUser where username = (?)";
   
    db.query(sqlCheckUserExist, [username], (err,result) => {
        if(result && result.length > 0){ //user found, send error to say try new name or login
            res.send({
                free : false
            })
        }else{ //no user by that name, register and login
            const sqlNewUser = 'INSERT INTO esgDB.tblUser (username, password, firstname) VALUES ((?), (?), (?))';
            
            db.query(sqlNewUser, [username,password,firstname], (err,result) =>{
                console.log('inserted user '+firstname)
            }); //insert user
            
            res.send({
                free : true
            })
        }
    });
    

})

//Card API
//Gets title info for a card using an ID
app.post('/api/cards/getTitle', (req,res) => {
    const id = req.body.id;

    const sqlCheckCardTitle = "SELECT title FROM esgDB.tblCards where id = (?)";

    db.query(sqlCheckCardTitle, [id], (err,result) => {
        if(result && result.length > 0){//ID found, do something
            //console.log(id + ' found title ' + result[0].title);
            res.send(
                result[0].title
            );
        }else{//id not found return error
            console.log(id + ' not found');
        }
    });
});

//Gets body info for a card using an ID
app.post('/api/cards/getBody', (req,res) => {
    const id = req.body.id
    var path = './Articles/'+id+'/body.html';

    fs.readFile(path, function(err, data) {
        if (err){
            console.log(err)
        }
        if (data){
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            
            res.write(data);
            
            res.end()
            
        }
        
      });

   
   
});

//Gets Image info for a card using an ID
app.post('/api/cards/getImage', (req,res) => {
    const id = req.body.id
    var path = './Articles/'+id+'/image.png';
    fs.readFile(path, 'base64' ,function(err,data) {
        if(err){
            return console.log(err);
        }
        res.send(
            data
        );
    });
});

//Used to load feed for a section (and optionally for a particular user)
app.post('/api/cards/getFeed', (req,res) => {
    const section = req.body.section;
    const username = req.body.username;
    const search = req.body.search;

    const sqlSearch         = `SELECT id FROM esgDB.tblCards WHERE section = (?) AND title LIKE '%${search}%'`;
    const sqlCheckFeed      = "SELECT id FROM esgDB.tblCards WHERE section = (?)";
    const sqlTurbulentFeed  = "SELECT id FROM esgDB.tblCards WHERE section = (?) AND turbulent = 1";
    const sqlHighAvgFeed    = "SELECT id FROM esgDB.tblCards WHERE section = (?) AND high = 1";
    const sqlLowAvgFeed     = "SELECT id FROM esgDB.tblCards WHERE section = (?) AND high = 0 AND turbulent = 0 AND universal = 0";
    const sqlUniversalFeed  = "SELECT id FROM esgDB.tblCards WHERE section = (?) AND universal = 1";

    
    if(search){ //queried a search term give results matching
        db.query(sqlSearch, [section], (err,result) => {
            console.log("searching for terms like " + search);
            if(result && result.length > 0){//section found, do something
                var idArray = shuffle(result.map((item) => item.id));
                console.log(idArray);
                res.send(
                    idArray
                );
            }else{//id not found return error
                console.log('nothing found');
                res.send(
                    []
                )
            }
        });
    }else if( username ){ //user logged in give custom feed
        //var usertype = 'HGH' //'TRB HGH LOW
        var queries = [] //array of queries to execute

        //Queries standard deviation and inverted avarage of array of ratios, ratios represent how much of the budget
        //a user has spent in each month < 1 over budget > 1 under budget
        //range (-inf:1]
        const sqlGetSpendingAnalytics =`SELECT stddev(ratio) as DEV, avg(ratio) as AVG
                                        FROM(
                                                SELECT (sum(amount)/max(budget))as ratio
                                                FROM esgDB.tblBudgetsAnalytics 
                                                WHERE username = (?)
                                                GROUP BY Month(budgetDate)
                                            ) as ratios`;
        
        //Queries standard deviation and avarage of array of ratios, ratios represent how much time was left of how long
        //a task was expected to take, postive indicated early completion, negative indicates late
        //range (-inf:1]
        const sqlGetTodoAnalytics =    `SELECT stddev((dateExpired - dateCompleted) / (dateExpired - dateCreated)) as DEV, 
                                                  avg((dateExpired - dateCompleted) / (dateExpired - dateCreated)) as AVG
                                        FROM esgDB.tblTodo 
                                        WHERE username = (?) 
                                        AND complete = 1 
                                        AND dateExpired != dateCreated`; //avoid nulls
        //Queries standard deviation and average of array of ratios, ratios represent how high a user scored their mood
        //range [0:1]
        const sqlGetMoodAnalytics =`SELECT stdDev((mood-1)/4) as DEV, 
                                              avg((mood-1)/4) as AVG 
                                    FROM esgDB.tblMoods
                                    WHERE username = (?);`;
        //choose which query to use based on which section we are in
        const sqlGetAnalytics = (() => {
                                            switch(section){
                                                case "FIN" : return sqlGetSpendingAnalytics;
                                                case "WEL" : return sqlGetMoodAnalytics;
                                                case "STD" : return sqlGetTodoAnalytics;
                                            }
                                        })();
        //threshold for categorising as high or low based on average
        const AvgThreshold = (() => {
                                        switch(section){
                                            case "FIN" : return 0.05;
                                            case "WEL" : return 0.5;
                                            case "STD" : return 0.1;
                                        }
                                    })();
        //Threshold for catorgorising as turbulent based on standard deviation
        const DevThreshold = 0.25;

        db.query(sqlGetAnalytics, [username], (err,result) => {
            if(result){
                console.log(result[0]);
                if(result[0].DEV > DevThreshold){
                    console.log("TURB");
                    queries = [sqlTurbulentFeed,sqlUniversalFeed,sqlLowAvgFeed,sqlHighAvgFeed];     //Turbulent feed
                }else if(result[0].AVG > AvgThreshold){
                    console.log("HIGH");
                    queries = [sqlHighAvgFeed,sqlUniversalFeed,sqlTurbulentFeed,sqlLowAvgFeed];     //HIGH feed
                }else{
                    console.log("LOW" + result.AVG);
                    queries = [sqlLowAvgFeed,sqlUniversalFeed,sqlTurbulentFeed,sqlHighAvgFeed];     //LOW feed
                }
            }else{
                queries = [sqlHighAvgFeed,sqlUniversalFeed,sqlTurbulentFeed,sqlLowAvgFeed];         //Default high
            }

            db.query(queries[0], [section], (err,result) => {
                    var idArray = shuffle(result.map((item) => item.id));
                    db.query(queries[1], [section], (err,result) => {
                            idArray.push(...shuffle(result.map((item) => item.id)));
                            db.query(queries[2], [section], (err,result) => {
                                idArray.push(...shuffle(result.map((item) => item.id)));
                                db.query(queries[3], [section], (err,result) => {
                                    idArray.push(...shuffle(result.map((item) => item.id)));
                                    console.log(idArray);
                                    res.send(
                                        idArray
                                    );
                                });
                            });
                    });
            });
        });

    }else{ //no user logged in give generic feed
        db.query(sqlCheckFeed, [section], (err,result) => {
            if(result && result.length > 0){//section found, do something
                var idArray = shuffle(result.map((item) => item.id));
                console.log(idArray);
                res.send(
                    idArray
                );
            }else{//id not found return error
                console.log(section + ' is not populated');
            }
        });
    }
});

//ANALYTICS
app.post('/api/analytics/getBudgetsAnalytics', (req,res) => {
    const username = req.body.username;
   

    console.log('\nQuerying for budget analysis for user '+username + '\n')
    

    const sqlGetItemsByName =  `SELECT budgetDate, amount, budget
                                FROM esgDB.tblBudgetsAnalytics 
                                WHERE username = (?) ORDER BY budgetDate ASC`;

    db.query(sqlGetItemsByName, [username], (err,result) => {
        if(result){//existing ones found found, do something                      
            /*res.send({
                result
            });*/

            var actual = [];
            var budget = [];
            var lastMonth = new Date(0);
            var amount = 0;
            var firstday;
            var lastday = new Date(result[0].budgetDate.getFullYear(), result[0].budgetDate.getMonth(), 1);
            var fullActual = [];
            var fullBudget = [];

            for(var i = 0; i < result.length; ++i){
                var date = result[i].budgetDate;
                if(lastMonth < date){ // reset rolling count and insert ideal trend
                    closer = {
                        amount: amount,
                        date : lastday
                    };
                    firstday = new Date(date.getFullYear(), date.getMonth(), 1);  
                    lastday  = new Date(date.getFullYear(), date.getMonth() +1, 0);
                    lastMonth = lastday;
                    zero = {
                            amount : 0, 
                            date : firstday
                            };
                    budgetMax = {
                                amount: result[i].budget, 
                                date : lastday
                                };
                    if(actual.length > 0){
                        actual.push(closer);
                    }
                    if(actual.length > 0){
                        fullActual.push(actual);
                        actual = [];
                        fullBudget.push(budget);
                        budget = [];
                    }
                    actual.push(zero);
                    budget.push(zero);
                    budget.push(budgetMax);
                    amount = 0; //reset amount 
                }
                amount += result[i].amount;
                actual.push({
                            amount : amount,
                            date   : date
                            });
            }
                fullActual.push(actual);
                actual = [];
                fullBudget.push(budget);
                budget = [];
            console.log(fullActual);
            /*res.send({
                fullActual,
                fullBudget
            });*///         SENDS FULL HISTORY
            res.send({
                fullActual : fullActual[(fullActual.length - 1)],
                fullBudget : fullBudget[(fullBudget.length -1)]                
            });
        }
    });
   
});

app.post('/api/analytics/getTodoAnalytics', (req,res) => {
    const username = req.body.username;

    console.log('\nQuerying for Todo analysis for user '+username + '\n')
    
    const sqlQueryTodoAnalytics = `SELECT * FROM(
                                        (SELECT COUNT(complete) AS complete 
                                        FROM esgDB.tblTodo 
                                        WHERE complete = 1 
                                        AND username = (?))AS complete,
                                        
                                        (SELECT COUNT(complete) AS incomplete 
                                        FROM esgDB.tblTodo 
                                        WHERE dateExpired < now() 
                                        AND complete = 0 
                                        AND username = (?))AS incomplete,
                                        
                                        (SELECT COUNT(complete) AS overdue 
                                        FROM esgDB.tblTodo 
                                        WHERE dateExpired > now() 
                                        AND complete = 0 
                                        AND username = (?))as overdue
                                   )`;

    db.query(sqlQueryTodoAnalytics, [username,username,username], (err,result) => {
        console.log(result);
        
        if(result){
            res.send({
                complete    : result[0].complete,
                incomplete  : result[0].incomplete,
                overdue     : result[0].overdue,
            });
        }else{
            res.send({
                complete    : 1,
                incomplete  : 0,
                overdue     : 0
            });
        }
    });
});

app.post('/api/analytics/getMoodAnalytics', (req,res) => {
    const username = req.body.username;
    
    console.log('\nQuerying for Mood analysis for user '+username + '\n')

    const sqlQueryMoodAnalytics =  `SELECT * FROM
                                        (SELECT avg(mood) as mood,moodDate 
                                        FROM esgDB.tblMoods 
                                        WHERE username = (?) 
                                        GROUP BY day(moodDate)
                                        ORDER BY moodDate DESC 
                                        LIMIT 30) as moods
                                    ORDER BY moodDate;`

    db.query(sqlQueryMoodAnalytics, [username], (err,result) => {
        console.log(result);
        if(result){
            res.send({
                result
            });
        }else{
            res.send({
                result : []
            });
        }
    });
});

/*
Updates budget
Parameters:
username    : string
month       : integer (passed january 2022)
budgetItems[]{
    name        : string
    amount      : float
    bloat       : float
    actual      : float
    unlocked    : bool
}
*/

//Finance API
/*
Get the budget Items
Parameters:
username    : string

returns:
array of budget Items

budgetItems[]{
    name        : string
    amount      : float
    bloat       : float
    actual      : float
    unlocked    : bool
}

if not found initializes based on most recent existing budget else returns 'NON'
*/
app.post('/api/budget/getBudget', (req,res) => {
    const username = req.body.username;

    console.log('\nQuerying for budget items for user '+username + '\n')
    
    const sqlGetItemsByName = "SELECT budgetName,amount,bloat,actual,unlocked FROM esgDB.tblBudgets WHERE username = (?) ORDER BY budgetName DESC";

    db.query(sqlGetItemsByName, [username], (err,result) => {
        
        if(result){//existing ones found found, do something           

            res.send({
                result
            });
        }
    });
   
});

//delete api for finance
app.post('/api/budget/deleteBudget', (req,res) => {
    const username = req.body.username;
    const budgetName = req.body.budgetName
   

    console.log('\nQuerying for budget items for user '+username + '\n')
    

    const sqlDeleteItem =  `DELETE FROM esgDB.tblBudgets 
    WHERE username = (?) AND budgetName = (?);`;

    db.query(sqlDeleteItem, [username, budgetName], (err,result) => {
        
        if(err){//existing ones found found, do something           

            console.log(err)
            };
        }
    );
   
});

/*
Get the budget analytics
Parameters:
username    : string

returns:
array of budget analytic items

budgetItems[]{
    budgetDate  : date
    amount      : float
    budget      : float
}

if not found initializes based on most recent existing budget else returns 'NON'
*/
app.post('/api/budget/getBudgetsAnalytics', (req,res) => {
    const username = req.body.username;
   

    console.log('\nQuerying for budget analysis for user '+username + '\n')
    

    const sqlGetItemsByName =  `SELECT budgetDate, amount, budget
                                FROM esgDB.tblBudgetsAnalytics 
                                WHERE username = (?) ORDER BY budgetDate ASC`;

    db.query(sqlGetItemsByName, [username], (err,result) => {
        if(result){//existing ones found found, do something                      
            res.send({
                result
            });
        }
    });
   
});

app.post('/api/budget/updateBudget', (req,res) => {
    const username = req.body.username
    const budgetItems = req.body.budgetItems
  
    
    /*
    username = (?), 
    name = (?), 
    amount = (?),
    bloat = (?), 
    actual = (?),
    unlocked = (?) 
    */

    
    const sqlInsertBudget = `INSERT INTO esgDB.tblBudgets 
    VALUES ((?), (?), (?), (?), (?), (?)) `
    const sqlUpdateBudget = `
    UPDATE esgDB.tblBudgets
    SET 
    budgetName = (?), 
    amount = (?),
    bloat = (?), 
    actual = (?),
    unlocked = (?) 
    
    WHERE username = (?) AND budgetName = (?);`

    
    
    
    budgetItems.forEach(({budgetName,amount,bloat,actual,unlocked, update}) => {
        
        if (update.new){
            db.query(sqlInsertBudget, [username,budgetName,amount,bloat,actual,unlocked, ], (err, result) => {
                if (err){
                    console.log(err)
                }
            })
        }else{         
            db.query(sqlUpdateBudget, [budgetName,amount,bloat,actual,unlocked, username, update.oldName ], (err, result) => {
                if (err){
                    console.log(err)
                }
            }) 
        }
        })
    
    
});

app.post('/api/budget/updateBudgetsAnalytics',(req, res) =>{
    const username = req.body.username
    const newEntry = req.body.newEntry
    const analytic = req.body.analytic
    const {date, amount, budget} = analytic

    

    const sqlInsertBudgetsAnalytics = `INSERT INTO esgDB.tblBudgetsAnalytics 
    VALUES ((?), (?), (?), (?)) `

    const sqlUpdateBudgetsAnalytics = `UPDATE esgDB.tblBudgetsAnalytics 
    SET     
    amount = (?),
    budget = (?)        
    WHERE username = (?) AND budgetDate = (?);`

    if (newEntry){
        db.query(sqlInsertBudgetsAnalytics, [username, date,amount,budget], (err, result) => {
            if (err){
                console.log(err)
            }
        })

    }else{
        db.query(sqlUpdateBudgetsAnalytics, [amount,budget,username,date], (err, result) => {
            if (err){
                console.log(err)
            }
        })
    }

})

// The study feature retrieval
app.post('/api/study/getTodo',(req, res) =>{
    username = req.body.username

    const sqlGetTodoFromUser = `
    SELECT todoName, dateCreated, dateExpired, complete FROM esgDB.tblTodo
    WHERE username = (?)`

    db.query(sqlGetTodoFromUser, [username], (err, result) => {
        if (err){
            console.log(err)
        }
        if(result){//existing ones found found, do something           
            
            res.send({
                result
            });
        }
    }) 


})

app.post('/api/study/deleteTodo', (req,res) => {
    const username = req.body.username;
    const todoName = req.body.todoName
    const dateCreated = req.body.dateCreated
    
   

    console.log('\nDeleting todo items for user '+username + '\n')
    

    const sqlDeleteItem =  `DELETE FROM esgDB.tblTodo
    WHERE username = (?) AND todoName = (?) and dateCreated = (?);`;

    db.query(sqlDeleteItem, [username, todoName, dateCreated], (err,result) => {
        
        if(err){//existing ones found found, do something           

            console.log(err)
            };
        }
    );
   
});

app.post('/api/study/updateTodo', (req,res) => {
    const username = req.body.username
    const todoList = req.body.todoList
    
  
    
    /*
   `username` 
  `todoName` 
  `dateCreated` datetime 
  `dateExpired` datetime
  `dateCompleted` datetime,
  `complete`
    */

    
    const sqlInsertTodo = `INSERT INTO esgDB.tblTodo 
    VALUES ((?), (?), (?), (?), null, (?)) `
    
    todoList.forEach(({todoName, dateCreated, dateExpired, completed}) => {

        db.query(sqlInsertTodo,[username,todoName,dateCreated, dateExpired,completed], (err,result) => {
        
            if(err){          
    
                console.log(err)
                };
            }
        );
    })    
    
    
    
    
});

app.post('/api/study/checkTodo', (req,res) => {

    const username = req.body.username
    const todoName = req.body.todoName
    const check = req.body.check
    const dateCompleted = req.body.dateCompleted
    const dateCreated = req.body.dateCreated

    const sqlCheckTodo = `UPDATE esgDB.tblTodo
    SET     
    complete = (?), 
    dateCompleted = (?)       
    WHERE username = (?) AND todoName = (?) AND dateCreated = (?);`

    db.query(sqlCheckTodo, [check,dateCompleted,username,todoName, dateCreated], (err, result) =>{
        if(err){          
    
            console.log(err)
            };
    })

})


app.post('/api/wellness/getMoods', (req,res) => {
    
    const username = req.body.username
    var morningDate = new Date()
    var midnightDate = new Date()
    morningDate.setHours(2,0,0,0)
    midnightDate.setHours(26,0,0,0)
    morningDate = morningDate.toISOString()
    midnightDate = midnightDate.toISOString()
    morningDate = morningDate.replace('T',' ')
    morningDate = morningDate.replace('Z','')
    midnightDate = midnightDate.replace('T',' ')
    midnightDate = midnightDate.replace('Z','')
   

    const sqlGetMoods = `SELECT moodDate, mood from esgDB.tblMoods 
    WHERE username = (?) AND moodDate BETWEEN (?) AND (?)`

    db.query(sqlGetMoods, [username, morningDate, midnightDate], (err, result) =>{
        if(err){          
    
            console.log(err)
            }
        if (result){
        
            res.send({result})
        }
    })

}
)

app.post('/api/wellness/updateMoods', (req,res) => {

    const username = req.body.username
    const list = req.body.list
    console.log(list)

    const sqlInsertMood = `INSERT INTO esgDB.tblMoods
    VALUES ((?), (?), (?)) `
    
    list.forEach(({moodDate, mood}) => {

        db.query(sqlInsertMood,[username,moodDate,mood], (err,result) => {
        
            if(err){          
    
                console.log(err)
                };
            }
        );
    })    

})


app.listen(serverPort, () => {
    console.log('running server on port ' + serverPort);
});
