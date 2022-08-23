using System;
using System.Collections.Generic;

namespace ProjetoMySQL.Models
{
    public partial class Mensagem
    {
        public int Id { get; set; }
        public int Avaliacao { get; set; }
        public string? Comentario { get; set; }
        public int DisciplinaId { get; set; }
    }
}
