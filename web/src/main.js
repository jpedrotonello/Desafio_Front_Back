$("#submit-form").submit(function(e) {
    e.preventDefault();

    _nome = $('#first-name').val();
    _sobrenome = $('#last-name').val();
    _email = $('#email').val();

    var jsonObj = {nome:_nome ,sobrenome:_sobrenome,email:_email};
    $.ajax({
        method: "POST",
        url: 'http://138.68.29.250:8082',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: jsonObj,
        success: function (data) {
            data = data.split('#');

            var insertNameRequest = insertItems(`http://localhost:3000/api/InsertName/${_nome}/${data[1]}`);
            var insertLastNameRequest = insertItems(`http://localhost:3000/api/InserLastName/${_sobrenome}/${data[3]}`);
            var insertEmailRequest = insertItems(`http://localhost:3000/api/InsertEmail/${_email}/${data[5]}`);

            var sumName = getSetItems(`http://localhost:3000/api/sumLastNames/`,'sumNome',`${data[1]}`);
            var sumLastName = getSetItems(`http://localhost:3000/api/sumNames/`,'sumSobreNome',`${data[3]}`);
            var sumEmail = getSetItems(`http://localhost:3000/api/sumEmail/`,'sumEmail',`${data[5]}`);

            
            $('#submit-form input').val("");
        },
        error: function (data) {
            alert('Não foi possível acessar. ');
        },
    })
});


function insertItems(link){
    $.ajax({
        headers: {'Content-Type':'application/json'},
        method: 'POST',
        dataType: 'json',
        url: link,
        success: function(data) {
            return data.status;
       },
       error: function(xhr, status, error) {
           return 'fail';
      }
   });
};

function getSetItems(link,cell, id){
    $.ajax({
        headers: {'Content-Type':'application/json'},
        method: 'GET',
        dataType: 'json',
        url: link + id,
        success: function(data) {
            $(`#${cell}`).html(parseInt(data.sum) + parseInt(id));

            var _sumNome = $("#sumTable #sumNome").text();
            var _sumSobreNome = $("#sumTable #sumSobreNome").text();
            var _sumEmail = $("#sumTable #sumEmail").text();

            total = parseInt(_sumNome) + parseInt(_sumSobreNome) + parseInt(_sumEmail);
            $(`#sumTotal`).html(total);

            if (_sumEmail > 0 && _sumNome > 0 && _sumSobreNome > 0){
                getSetAnimalCorPais(parseInt(total));
            }
                                

   return data.sum;
       },
       error: function(xhr, status, error) {
        return 'fail';
      }
   });
};

function getSetAnimalCorPais(soma){
    $.ajax({
        headers: {'Content-Type':'application/json'},
        method: 'GET',
        dataType: 'json',
        url: `http://localhost:3000/api/getAnimalColorCountry/${soma}`,
        success: function(data) {
            $(`#animal`).html(data.recordset[0].animal);
            $(`#cor`).html(data.recordset[0].cor);
            $(`#pais`).html(data.recordset[0].pais);

        return data.sum;
        },
       error: function(xhr, status, error) {
        return 'fail';
      }
   });
};