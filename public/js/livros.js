var usuario;

firebase.auth().onAuthStateChanged(function (user) {
    (user)?usuario = user:window.location.replace('../index.html');
});

var adicionaLivro = function (nome, autor, foto, texto) {
    firebase.database().ref('livros/' + nome).set({
        nome: nome,
        autor: autor,
        foto: foto,
        texto: texto
    });
}


var mostraLivros = function () {
    $('#livros')[0].textContent = '';
    firebase.database().ref('livros/').on('value', function(snapshot) {
        var livros = snapshot.toJSON(snapshot);

        for(var i = 0; i < Object.keys(livros).length; i++) {
            var obj = livros[Object.keys(livros)[i]];

            var nomeLink = obj.nome;
            var autorLink = obj.autor;
            
            var div1 = document.createElement('div');
            div1.setAttribute('class', 'col-lg-4 col-sm-6');

            var a = document.createElement('a');
            a.setAttribute('class', 'portfolio-box');
            a.setAttribute('href', 'livro.html?'+nomeLink+'?'+autorLink);

            var img = document.createElement('img');
            img.setAttribute('class', 'img-fluid');
            img.setAttribute('src', 'http://sn.uploads.im/t/'+obj.foto+'.jpg');

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'portfolio-box-caption');

            var info= document.createElement('div');
            info.setAttribute('class', 'portfolio-box-caption-content');

            var livro = document.createElement('div');
            livro.setAttribute('class', 'project-category text-faded');
            livro.textContent = obj.nome.toUpperCase();

            var autor = document.createElement('div');
            autor.setAttribute('class', 'project-name');
            autor.textContent = obj.autor.toUpperCase();
            
            info.appendChild(livro);
            info.appendChild(autor);
            div2.appendChild(info);
            a.appendChild(img);
            a.appendChild(div2);
            div1.appendChild(a);

            $('#livros')[0].appendChild(div1);
        }
    });
}

mostraLivros();

$('#adicionarLivro')[0].addEventListener('click', function(){
    var nome = $('#nome')[0].value;
    var autor = $('#autor')[0].value;
    var foto  = $('#foto')[0].value;
    var texto = $('#autor')[0].value;
    adicionaLivro(nome, autor, foto, texto);
    mostraLivros();
});

var buildErrorMessage = function (mensagem) {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-danger alert-dismissible fade show');
    div.setAttribute('role', 'alert');

    var teste = document.createElement('span');
    teste.textContent = mensagem;

    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'close');
    btn.setAttribute('data-dismiss', 'alert');
    btn.setAttribute('aria-label', 'close');

    var span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    btn.appendChild(span);
    div.appendChild(teste);
    div.appendChild(btn);

    return $('#error')[0].appendChild(div);
}

$('#deslogar')[0].addEventListener('click', function (){
    firebase.auth().signOut().then(()=> window.location.replace('../index.html')).catch((error)=> alert('Erro ao deslogar'));
});
