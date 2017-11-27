var usuario;

firebase.auth().onAuthStateChanged((user)=> (user)? usuario = user.email.split('@')[0]:window.location.replace('../index.html'));

var mostraComentarios = function (){
    $('#comentarios')[0].textContent = '';
    firebase.database().ref('comentarios/apologia%20de%20s%C3%B3crates').on('value', function(snapshot) {
        var comentarios = snapshot.toJSON(snapshot);

        for(var i = Object.keys(comentarios).length-1; i >= 0; i--) {
            var obj = comentarios[Object.keys(comentarios)[i]];

            var div = document.createElement('div');
            div.setAttribute('class', 'alert alert-primary comentario');
            div.setAttribute('role', 'alert');
        
            var h4 = document.createElement('h4');
            h4.textContent = '"... '+obj.selecao+' ..."';
        
            var h6 = document.createElement('h6');
            h6.textContent = '"'+obj.comentario+'" -'+obj.usuario+'.';
        
            div.appendChild(h4);
            div.appendChild(h6);
            $('#comentarios')[0].appendChild(div);
        }
    });
}

mostraComentarios();

var adicionaComentario = function (hora, nomeDoLivro, selecao, comentario, username) {
    firebase.database().ref('comentarios/' + nomeDoLivro +'/'+ hora).set({
        usuario: username,
        selecao: selecao,
        comentario: comentario
    });
}
    
$('#pagina')[0].addEventListener('mouseup', function () {
    var selObj = window.getSelection();
    var selecao = selObj.toString();
    if (selecao) {
        bootbox.prompt("Comente o trecho selecionado", function(result){
            var timestamp = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            timestamp = timestamp+'';
            adicionaComentario(timestamp.split('.')[0], window.location.href.split('?')[1], selecao, result, usuario);
            setTimeout(mostraComentarios(), 600);
        });
    }
});
