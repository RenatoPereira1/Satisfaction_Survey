//Funcao para logar no sistema
function logar() {
    var login = $("#login").val();
    var senha = $("#senha").val();


    $.get('https://x8ki-letl-twmt.n7.xano.io/api:inHLZiR6/usuario')
        .done(function (resposta) {
            for (i = 0; i < resposta.length; i++) {
                if (resposta[i].login == login && resposta[i].senha == senha) {
                    if (resposta[i].grupo == 'aluno') {
                        window.location.href = "./envio_avaliacao.html";
                    } else { window.location.href = "./avaliacoes.html" }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Credenciais incorretas, tente novamente!!'
                    })
                }
            }
        })
        .fail(function (erro, mensagem, excecao) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo de errado aconteceu!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
            })
        });


}

//Funcao para deslogar do sistema
function logout() {
    window.location.href = "index.html";
}

//Envio da avaliacao
function envio() {
    let mensagem = {
        avaliacao: formulario.avalInput.value,
        comentario: formulario.mensagemInput.value,
        disciplina_id: formulario.disciplinaInput.value
        
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Mensagem/Cadastrar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(mensagem),
        success: function () {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Avaliação enviada com sucesso',
                showConfirmButton: false,
                timer: 3500
            }),
                setTimeout(function () {
                    window.location.reload();
                }, 3800);
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao enviar a avalização!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
            })
        }
    });

}

//Funcao para pegar todas as avaliacoes
function getAvaliacoes() {
    $.get('https://localhost:5001/Mensagem/Listar')
        .done(function (avaliacoes) {
            for (i = 0; i < avaliacoes.length; i++) {
                let row = $('<tr class="text-center"></tr>');

                row.append($('<td></td>').html(avaliacoes[i].id));
                row.append($('<td></td>').html(avaliacoes[i].avaliacao));
                row.append($('<td></td>').html(avaliacoes[i].comentario));

                let botaoVisualizar = $('<button class="btn btn-primary"></button>').attr('type', 'button').html('Visualizar').attr('onclick', 'visualisarAvaliacao(' + avaliacoes[i].id + ')');
                let botaoExcluir = $('<button class="btn btn-danger"></button>').attr('type', 'button').html('Excluir').attr('onclick', 'deleteAvaliacao(' + avaliacoes[i].id + ')');
                
                let excluir = $('<td></td>');
                let visualizar = $('<td></td>');

                visualizar.append(botaoVisualizar);
                row.append(visualizar);

                excluir.append(botaoExcluir);
                row.append(excluir);

                $('#grid').append(row);
            }
        })
        .fail(function (erro, mensagem, excecao) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo de errado aconteceu!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
            })
        });
}

function deleteAvaliacao(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Mensagem/Excluir',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function (resposta) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Avaliação deletada com sucesso',
                showConfirmButton: false,
                timer: 1500
            }),
            setTimeout(function () {
                window.location.reload();
            }, 1800);
        }
    })
}

function visualisarAvaliacao(id){
    $.get('https://localhost:5001/Mensagem/Visualisar?id='+id)
    .done(function(resposta){
        let visualizacao = "ID: " + resposta.id;
        visualizacao += '\n';
        visualizacao += "NOTA: " + resposta.avaliacao;
        visualizacao += '\n';
        visualizacao += "COMENTÁRIO: " + resposta.comentario;
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: visualizacao,
            showConfirmButton: true
        })
    })
}

$(document).ready(function () {
    getAvaliacoes();
});

function easteregg() {
    Swal.fire({
        title: 'Cade os meus dois pontos, Andre?',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./img/chew.webp")
          left top
          no-repeat
        `
    })
}