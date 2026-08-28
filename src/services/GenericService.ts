import api, { type QueryParams } from '@/services/api'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export default class GenericService<T> {
  protected url: string

  constructor(resource: string) {
    this.url = `/${resource}/`
  }

  async create(data: Omit<T, 'uuid'>): Promise<T> {
    return api.post<T, Omit<T, 'uuid'>>(this.url, data)
  }

  async update(uuid: string, data: Partial<T>): Promise<T> {
    return api.patch<T, Partial<T>>(`${this.url}${uuid}/`, data)
  }

  async delete(uuid: string): Promise<void> {
    await api.delete(`${this.url}${uuid}/`)
  }

  async getAll(params?: QueryParams): Promise<T[]> {
    const response = await api.get<PaginatedResponse<T> | T[]>(this.url, params)
    return Array.isArray(response) ? response : response.results
  }

  async getPaginated(params?: QueryParams): Promise<PaginatedResponse<T>> {
    return api.get<PaginatedResponse<T>>(this.url, params)
  }

  async getByUuid(uuid: string): Promise<T> {
    return api.get<T>(`${this.url}${uuid}/`)
  }
}
