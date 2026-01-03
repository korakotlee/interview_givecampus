import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '../DeleteModal';
import { describe, it, expect, vi } from 'vitest';

describe('DeleteModal', () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const title = "My Story";

  it('renders correctly when open', () => {
    render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title={title} />);

    expect(screen.getByText(/delete story\?/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { queryByText } = render(<DeleteModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} title={title} />);
    expect(queryByText(/delete story\?/i)).not.toBeInTheDocument();
  });

  it('calls onConfirm when delete button is clicked', () => {
    render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title={title} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title={title} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
