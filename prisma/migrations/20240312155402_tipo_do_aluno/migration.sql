-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "tipo" VARCHAR(1) NOT NULL DEFAULT 'M';

-- CreateTable
CREATE TABLE "turma" (
    "id" UUID NOT NULL,
    "programa" VARCHAR(30) NOT NULL,
    "edicao" VARCHAR(30) NOT NULL,
    "max_alunos" INTEGER,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "idAluno" UUID NOT NULL,
    "idTurma" UUID NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("idAluno","idTurma")
);

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_idAluno_fkey" FOREIGN KEY ("idAluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_idTurma_fkey" FOREIGN KEY ("idTurma") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
