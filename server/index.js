const express = require('express');
const app = express();
var cors = require('cors');

//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  

const config = {
    user: 'user_trial',
    password: '7412LIVE!@#$%¨&*()',
    server: 'virtual2.febracorp.org.br', 
    database: 'CONTOSO',
    port:1433,
    encrypt:false
};

// Inserts section

app.post('/api/InsertName/:nome/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) res.send('intern error');

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        query = `insert into tbs_nome  values ('${req.params.nome}',${req.params.cod}) `;
        request.query(query, function (err, recordset) {
            
            if (err) res.send('intern error');

            // send records as a response
            res.send({status: 'success'});
            
        });
    });
});

app.post('/api/InserLastName/:sobrenome/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) res.send('intern error');

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        query = `insert into tbs_sobrenome  values ('${req.params.sobrenome}',${req.params.cod}) `;
        request.query(query, function (err, recordset) {
            
            if (err) res.send('intern error');

            // send records as a response
            res.send({status: 'success'});
            
        });
    });
});

app.post('/api/InsertEmail/:email/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) res.send('intern error');

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        query = `insert into tbs_email  values ('${req.params.email}',${req.params.cod}) `;
        request.query(query, function (err, recordset) {
            
            if (err) res.send('intern error');

            // send records as a response
            res.send({status: 'success'});
            
        });
    });
});

// Get section

app.get('/api/allNames', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select * from  tbs_nome`, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.get('/api/sumNames/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select count(*) as sum from  tbs_nome where cod = ${req.params.cod}`, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            res.send(recordset.recordset[0]);
            
        });
    });
});

app.get('/api/sumLastNames/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select count(*) as sum from  tbs_sobrenome where cod = ${req.params.cod}`, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            res.send(recordset.recordset[0]);
            
        });
    });
});

app.get('/api/sumEmail/:cod', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select count(*) as sum from  tbs_email where cod = ${req.params.cod}`, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            res.send(recordset.recordset[0]);
            
        });
    });
});

app.get('/api/getAnimalColorCountry/:total', (req, res) => {
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        var query = ' select top 1 an.total, an.animal, co.cor, pa.pais, ex.cor as ex_cor from  tbs_animais an ';
        query +=    ' inner join tbs_cores co on an.total = co.total ';
        query +=    ' inner join tbs_paises as pa on an.total = pa.total ';
        query +=    ' left join tbs_cores_excluidas as ex on co.cor = ex.cor and co.total = ex.total ';
        query +=    ` where an.total = 17579 and ex.cor is null ` 
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        });
    });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening port ${port}`));
