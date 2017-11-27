var buildErrorMessage = function (mensagem, id) {
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

    return $(id)[0].appendChild(div);
}

const gProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.database();

firebase.auth().onAuthStateChanged((user)=> (user)?window.location.replace('../livros.html'):null);

$('#registrar')[0].addEventListener('click', function (e) {
    var email = $('#usernameReg')[0].value + '@filosofo.com';
    var senha = $('#senhaReg')[0].value;
    var confirmsenha = $('#confirmsenhaReg')[0].value;
    if(senha === confirmsenha){
        firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error) {
            var errorCode = error.code;
            if (error.message === "Password should be at least 6 characters") buildErrorMessage("A senha deve ter pelo menos 6 caracteres");
        });
    }else buildErrorMessage("As senhas não são correspondentes.");

    e.preventDefault();
});

$('#normalLogin')[0].addEventListener('click', function(e) {
    var email = $('#username')[0].value + '@filosofo.com';
    var password = $('#senha')[0].value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        if (error.message === "The password is invalid or the user does not have a password.") buildErrorMessage("A senha é inválida ou o usuário não possui uma senha.");
        if (error.message === "The email address is badly formatted.") buildErrorMessage("O endereço de e-mail está mal formatado.");
        if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") buildErrorMessage("Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.");
    });
    setTimeout(function() {
        firebase.auth().onAuthStateChanged((user)=> (user)?window.location.replace('../livros.html'):null);
    },1500);
    e.preventDefault();
});

$('#gLogin')[0].addEventListener('click', function() {
    firebase.auth().signInWithRedirect(gProvider).catch(function(erro) {
        alert("Falha ao realizar o login");
    });
});

$('#fbLogin')[0].addEventListener('click', function() {
    firebase.auth().signInWithRedirect(fbProvider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    });
});