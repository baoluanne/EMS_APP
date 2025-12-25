import {
  Active,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { dropAnimationConfig } from './configs';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

interface Item {
  id: string;
}

interface DraggableContainerProps<T extends Item> {
  items: T[];
  setItems: (items: T[]) => void;
  children: React.ReactNode;
  renderItem: (item: T) => React.ReactElement;
}

export const DraggableContainer = <T extends Item>({
  items,
  setItems,
  children,
  renderItem,
}: DraggableContainerProps<T>) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const onDragStart = ({ active }) => {
    setActive(active);
  };

  const onDragEnd = ({ active, over }) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      setItems(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };

  const onDragCancel = () => {
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem ? renderItem(activeItem) : null}
      </DragOverlay>
    </DndContext>
  );
};
