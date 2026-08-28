import { afterEach, describe, expect, it, vi } from 'vitest'
import api from '@/services/api'
import GenericService, { type PaginatedResponse } from '@/services/GenericService'

vi.mock('@/services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}))

interface Widget {
    uuid: string
    name: string
}

describe('GenericService', () => {
    const service = new GenericService<Widget>('widgets')

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('monta a url do recurso com base no nome passado no constructor', async () => {
        vi.mocked(api.get).mockResolvedValue([])

        await service.getAll()

        expect(api.get).toHaveBeenCalledWith('/widgets/', undefined)
    })

    it('getAll repassa os params recebidos', async () => {
        vi.mocked(api.get).mockResolvedValue([])

        await service.getAll({ page: 2 })

        expect(api.get).toHaveBeenCalledWith('/widgets/', { page: 2 })
    })

    it('getAll retorna a lista direto quando a api responde um array (sem paginação)', async () => {
        const widgets: Widget[] = [{ uuid: '1', name: 'Widget' }]
        vi.mocked(api.get).mockResolvedValue(widgets)

        const result = await service.getAll()

        expect(result).toEqual(widgets)
    })

    it('getAll extrai results quando a api responde uma página', async () => {
        const page: PaginatedResponse<Widget> = {
            count: 1,
            next: null,
            previous: null,
            results: [{ uuid: '1', name: 'Widget' }],
        }
        vi.mocked(api.get).mockResolvedValue(page)

        const result = await service.getAll()

        expect(result).toEqual(page.results)
    })

    it('getPaginated retorna a página completa, sem desembrulhar', async () => {
        const page: PaginatedResponse<Widget> = {
            count: 1,
            next: null,
            previous: null,
            results: [{ uuid: '1', name: 'Widget' }],
        }
        vi.mocked(api.get).mockResolvedValue(page)

        const result = await service.getPaginated()

        expect(result).toEqual(page)
    })

    it('create delega para api.post sem exigir campos gerados pelo servidor (uuid)', async () => {
        const created: Widget = { uuid: '1', name: 'Widget' }
        vi.mocked(api.post).mockResolvedValue(created)

        const result = await service.create({ name: 'Widget' })

        expect(api.post).toHaveBeenCalledWith('/widgets/', { name: 'Widget' })
        expect(result).toEqual(created)
    })

    it('update delega para api.patch com a url do recurso específico', async () => {
        const patch = { name: 'Renomeado' }
        vi.mocked(api.patch).mockResolvedValue({ uuid: '1', name: 'Renomeado' })

        await service.update('1', patch)

        expect(api.patch).toHaveBeenCalledWith('/widgets/1/', patch)
    })

    it('delete delega para api.delete com a url do recurso específico', async () => {
        vi.mocked(api.delete).mockResolvedValue(undefined)

        await service.delete('1')

        expect(api.delete).toHaveBeenCalledWith('/widgets/1/')
    })

    it('getByUuid delega para api.get com a url do recurso específico', async () => {
        const widget: Widget = { uuid: '1', name: 'Widget' }
        vi.mocked(api.get).mockResolvedValue(widget)

        const result = await service.getByUuid('1')

        expect(api.get).toHaveBeenCalledWith('/widgets/1/')
        expect(result).toEqual(widget)
    })
})
