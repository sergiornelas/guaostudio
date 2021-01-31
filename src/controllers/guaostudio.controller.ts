// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
// ------------------------------------
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Blog} from '../models';
import {BlogRepository} from '../repositories';

//@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
@authenticate.skip()
export class GuaostudioController {
  constructor(
    @repository(BlogRepository)
    public blogRepository : BlogRepository,
  ) {}

  @post('/blogs')
  @response(200, {
    description: 'Blog model instance',
    content: {'application/json': {schema: getModelSchemaRef(Blog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {
            title: 'NewBlog',
            exclude: ['id'],
          }),
        },
      },
    })
    blog: Omit<Blog, 'id'>,
  ): Promise<Blog> {
    return this.blogRepository.create(blog);
  }

  @get('/blogs/count')
  @response(200, {
    description: 'Blog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Blog) where?: Where<Blog>,
  ): Promise<Count> {
    return this.blogRepository.count(where);
  }

  @get('/blogs')
  @response(200, {
    description: 'Array of Blog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Blog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Blog) filter?: Filter<Blog>,
  ): Promise<Blog[]> {
    return this.blogRepository.find(filter);
  }

  @patch('/blogs')
  @response(200, {
    description: 'Blog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {partial: true}),
        },
      },
    })
    blog: Blog,
    @param.where(Blog) where?: Where<Blog>,
  ): Promise<Count> {
    return this.blogRepository.updateAll(blog, where);
  }

  @get('/blogs/{id}')
  @response(200, {
    description: 'Blog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Blog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Blog, {exclude: 'where'}) filter?: FilterExcludingWhere<Blog>
  ): Promise<Blog> {
    return this.blogRepository.findById(id, filter);
  }

  @patch('/blogs/{id}')
  @response(204, {
    description: 'Blog PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {partial: true}),
        },
      },
    })
    blog: Blog,
  ): Promise<void> {
    await this.blogRepository.updateById(id, blog);
  }

  @put('/blogs/{id}')
  @response(204, {
    description: 'Blog PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() blog: Blog,
  ): Promise<void> {
    await this.blogRepository.replaceById(id, blog);
  }

  @del('/blogs/{id}')
  @response(204, {
    description: 'Blog DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.blogRepository.deleteById(id);
  }
}
