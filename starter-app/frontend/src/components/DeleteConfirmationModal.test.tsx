import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import React from 'react';

describe('DeleteConfirmationModal', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <DeleteConfirmationModal isOpen={false} taskTitle="Test" onConfirm={vi.fn()} onCancel={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render and call onConfirm when delete button is clicked', () => {
    const onConfirm = vi.fn();
    render(
      <DeleteConfirmationModal isOpen={true} taskTitle="Test Task 123" onConfirm={onConfirm} onCancel={vi.fn()} />
    );
    
    expect(screen.getByText('Are you sure you want to delete "Test Task 123"?')).toBeInTheDocument();
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(
      <DeleteConfirmationModal isOpen={true} taskTitle="Test" onConfirm={vi.fn()} onCancel={onCancel} />
    );
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onCancel on Escape key press', () => {
    const onCancel = vi.fn();
    render(
      <DeleteConfirmationModal isOpen={true} taskTitle="Test" onConfirm={vi.fn()} onCancel={onCancel} />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });
});
