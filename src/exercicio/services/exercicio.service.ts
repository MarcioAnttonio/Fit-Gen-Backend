import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Exercicio } from '../entities/exercicio.entity';

@Injectable()
export class ExercicioService {
  constructor(
    @InjectRepository(Exercicio)
    private exercicioRepository: Repository<Exercicio>,
  ) {}

  async findAll(): Promise<Exercicio[]> {
    return await this.exercicioRepository.find();
  }

  async findById(id: number): Promise<Exercicio> {
    const exercicio = await this.exercicioRepository.findOne({
      where: {
        id,
      },
    });

    if (!exercicio)
      throw new HttpException(
        'exercicio não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return exercicio;
  }

  async findByType(exercicio: string): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      where: {
        tipo_exercicio: ILike(`%${exercicio}%`),
      },
    });
  }

  async create(exercicio: Exercicio): Promise<Exercicio> {
    return await this.exercicioRepository.save(exercicio);
  }

  async update(exercicio: Exercicio): Promise<Exercicio> {
    await this.findById(exercicio.id);
    return await this.exercicioRepository.save(exercicio);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.exercicioRepository.delete(id);
  }
}
