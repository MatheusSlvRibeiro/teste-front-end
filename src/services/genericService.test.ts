import api from '@/services/api';
import GenericService from './genericService';

vi.mock('@/services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

interface Item {
    id: string;
    name: string;
}

describe('GenericService', () => {
    const service = new GenericService<Item>('items');

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('builds the resource URL from the given resource name', () => {
        expect(service['url']).toBe('/items/');
    });

    it('create() posts to the resource URL', async () => {
        const payload = { id: '1', name: 'Item 1' };
        vi.mocked(api.post).mockResolvedValueOnce(payload);

        const result = await service.create(payload);

        expect(api.post).toHaveBeenCalledWith('/items/', payload);
        expect(result).toEqual(payload);
    });

    it('update() patches the resource by uuid', async () => {
        const payload = { name: 'Updated' };
        vi.mocked(api.patch).mockResolvedValueOnce({
            id: '1',
            name: 'Updated',
        });

        await service.update('1', payload);

        expect(api.patch).toHaveBeenCalledWith('/items/1/', payload);
    });

    it('delete() calls DELETE on the resource by uuid', async () => {
        vi.mocked(api.delete).mockResolvedValueOnce(undefined);

        await service.delete('1');

        expect(api.delete).toHaveBeenCalledWith('/items/1/');
    });

    it('getAll() fetches the collection with optional query params', async () => {
        const items = [{ id: '1', name: 'Item 1' }];
        vi.mocked(api.get).mockResolvedValueOnce(items);

        const result = await service.getAll({ page: 1 });

        expect(api.get).toHaveBeenCalledWith('/items/', { page: 1 });
        expect(result).toEqual(items);
    });

    it('getByUuid() fetches a single resource by uuid', async () => {
        const item = { id: '1', name: 'Item 1' };
        vi.mocked(api.get).mockResolvedValueOnce(item);

        const result = await service.getByUuid('1');

        expect(api.get).toHaveBeenCalledWith('/items/1/');
        expect(result).toEqual(item);
    });
});
