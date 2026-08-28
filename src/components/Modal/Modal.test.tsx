import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

function renderModal(isOpen: boolean, onClose = vi.fn()) {
    render(
        <Modal isOpen={isOpen} onClose={onClose} labelledBy="modal-title">
            <h2 id="modal-title">Título do modal</h2>
            <p>Conteúdo</p>
        </Modal>,
    )
    return onClose
}

describe('Modal', () => {
    it('não renderiza nada quando isOpen é false', () => {
        renderModal(false)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renderiza o conteúdo quando isOpen é true', () => {
        renderModal(true)
        expect(screen.getByRole('dialog', { name: 'Título do modal' })).toBeInTheDocument()
        expect(screen.getByText('Conteúdo')).toBeInTheDocument()
    })

    it('chama onClose ao pressionar Esc', async () => {
        const onClose = renderModal(true)
        await userEvent.keyboard('{Escape}')
        expect(onClose).toHaveBeenCalledOnce()
    })

    it('chama onClose ao clicar no botão de fechar', async () => {
        const onClose = renderModal(true)
        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
        expect(onClose).toHaveBeenCalledOnce()
    })

    it('chama onClose ao clicar fora do conteúdo (overlay)', async () => {
        const onClose = renderModal(true)
        await userEvent.click(screen.getByTestId('modal-overlay'))
        expect(onClose).toHaveBeenCalledOnce()
    })

    it('não chama onClose ao clicar dentro do conteúdo', async () => {
        const onClose = renderModal(true)
        await userEvent.click(screen.getByText('Conteúdo'))
        expect(onClose).not.toHaveBeenCalled()
    })
})
