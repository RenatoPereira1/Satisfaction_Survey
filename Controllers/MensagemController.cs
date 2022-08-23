using Microsoft.AspNetCore.Mvc;
using ProjetoMySQL.Models;

namespace ProjetoMySQL.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class MensagemController : ControllerBase
    {
        private BDContexto contexto;
        
        public MensagemController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
        public List<Mensagem> Listar()
        {
            return contexto.Mensagems.ToList();
        }

        [HttpGet]

        public Mensagem Visualisar(int id)
        {
            return contexto.Mensagems.Select(c => new Mensagem
            {
                Id = c.Id,
                Avaliacao = c.Avaliacao,
                Comentario = c.Comentario

            }).FirstOrDefault(p => p.Id == id);
        }

        [HttpPost]
        public string Cadastrar([FromBody] Mensagem novaMensagem)
        {
            contexto.Add(novaMensagem);
            contexto.SaveChanges();
            return "Avaliação cadastrada com sucesso!";
        }

        [HttpDelete]
        public string Excluir([FromBody]int id)
        {
            Mensagem dados = contexto.Mensagems.FirstOrDefault(p => p.Id == id);
            if(dados == null)
            {
                return"Não foi encontrada mensagem para esse Id informado";

            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();
                return"Mensagem removida com sucesso";
            }
        }

        
    }
}