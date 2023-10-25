import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableOverlay } from "./sortable-overlay";
import { DragHandle, SortableItem } from "./sortable-item";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(index1: number, index2: number): void;
  renderItem(item: T, index: number): React.ReactNode;
  renderDraggedItem(item: T, index: number): React.ReactNode;
  onDragStartAdditional?: () => void;
  onDragEndAdditional?: () => void;
  className?: string;
}

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
  renderDraggedItem,
  onDragStartAdditional,
  onDragEndAdditional,
  className,
}: Props<T>) {
  const [active, setActive] = React.useState<Active | null>(null);
  const activeItem = React.useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        onDragStartAdditional && onDragStartAdditional();
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(activeIndex, overIndex);
        }
        setActive(null);
        onDragEndAdditional && onDragEndAdditional();
      }}
      onDragCancel={() => {
        setActive(null);
        onDragEndAdditional && onDragEndAdditional();
      }}
    >
      <SortableContext items={items}>
        <ul className={className} role="application">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem
          ? renderDraggedItem(
              activeItem,
              items.findIndex(({ id }) => id === activeItem.id),
            )
          : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
