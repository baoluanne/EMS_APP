import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

export const useDraggableItem = (id: string) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return { attributes, listeners, style, setNodeRef };
};
