using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjetoMySQL.Models
{
    public partial class BDContexto : DbContext
    {
        public BDContexto()
        {
        }

        public BDContexto(DbContextOptions<BDContexto> options)
            : base(options)
        {
        }

        public virtual DbSet<Mensagem> Mensagems { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=sql10.freemysqlhosting.net;user=sql10502137;password=qhXA5UN3Xc;database=sql10502137", Microsoft.EntityFrameworkCore.ServerVersion.Parse("5.5.62-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("latin1_swedish_ci")
                .HasCharSet("latin1");

            modelBuilder.Entity<Mensagem>(entity =>
            {
                entity.ToTable("mensagem");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Avaliacao)
                    .HasColumnType("int(11)")
                    .HasColumnName("avaliacao");

                entity.Property(e => e.Comentario)
                    .HasMaxLength(300)
                    .HasColumnName("comentario");

                entity.Property(e => e.DisciplinaId)
                    .HasColumnType("int(11)")
                    .HasColumnName("disciplina_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
