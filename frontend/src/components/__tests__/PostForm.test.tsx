import { render, screen, fireEvent } from '@testing-library/react';
import PostForm from '../PostForm';
import { describe, it, expect, vi } from 'vitest';

describe('PostForm', () => {
  const mockOnSubmit = vi.fn();
  const initialData = {
    title: 'Test Post',
    content: 'Test content',
    category: 'Test',
    authorName: 'Author'
  };

  it('renders all fields correctly', () => {
    render(<PostForm initialData={initialData} onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Post');
    expect(screen.getByLabelText(/content/i)).toHaveValue('Test content');
    expect(screen.getByLabelText(/category/i)).toHaveValue('Test');
    expect(screen.getByLabelText(/author name/i)).toHaveValue('Author');
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<PostForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText(/author name/i), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New content' } });

    fireEvent.click(screen.getByRole('button', { name: /publish post/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Post',
      content: 'New content',
      category: '',
      authorName: 'New Author'
    });
  });

  it('shows loading state on submit button', () => {
    render(<PostForm onSubmit={mockOnSubmit} isSubmitting={true} />);
    expect(screen.getByRole('button')).toHaveTextContent(/processing/i);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays inline error messages', () => {
    const errors = ['Title is too short', 'Content cannot be blank'];
    render(<PostForm onSubmit={mockOnSubmit} isSubmitting={false} errors={errors} />);

    expect(screen.getByText('Title is too short')).toBeInTheDocument();
    expect(screen.getByText('Content cannot be blank')).toBeInTheDocument();
  });
});
