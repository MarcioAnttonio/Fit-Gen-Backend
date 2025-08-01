import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_exercicio: string;

  @Column()
  repeticoes: number;

  @Column()
  treino: string;
}
