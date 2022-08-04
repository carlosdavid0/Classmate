import Application from '@ioc:Adonis/Core/Application'

import { v4 as uuid } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  private validator = {
    types: ['image/png', 'image/jpeg'],
    size: '2mb',
  }

  public async index(ctx: HttpContextContract) {
    const aluno = await Aluno.query().select('nome', 'email')
    return aluno
  }

  public async show(ctx: HttpContextContract) {
    const { id } = ctx.params
    const aluno = await Aluno.findOrFail(id)
    ctx.response.json(aluno)
  }

  public async store(ctx: HttpContextContract) {
    const body = ctx.request.body()

    const aluno = await Aluno.create(body)
    ctx.response.status(201).json({ message: 'Aluno criado com sucesso', aluno })
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params
    const body = ctx.request.body()
    const aluno = await Aluno.findOrFail(id)
    await aluno.merge(body)
    await aluno.save()
    ctx.response.json({ message: 'Aluno atualizado com sucesso', aluno })
  }
}
