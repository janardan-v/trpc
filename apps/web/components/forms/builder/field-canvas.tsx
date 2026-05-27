"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BuilderField } from "~/types/form";
import { FieldCard } from "./field-card";

interface SortableFieldProps {
  field: BuilderField;
  selected: boolean;
  onSelect: () => void;
}

function SortableField({ field, selected, onSelect }: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <FieldCard
        field={field}
        selected={selected}
        onSelect={onSelect}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

interface Props {
  fields: BuilderField[];
  selected?: string;
  setSelected: (id: string) => void;
  updateField: (payload: any) => Promise<any>;
}

export function FieldCanvas({ fields, selected, setSelected, updateField }: Props) {
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    const moved = arrayMove(fields, oldIndex, newIndex);

    await Promise.all(
      moved.map((field, index) =>
        updateField({
          fieldId: field.id,
          label: field.label,
          type: field.type,
          description: field.description ?? undefined,
          placeholder: field.placeholder ?? undefined,
          isRequired: field.isRequired,
          index: String(index),
        })
      )
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {fields.map((field) => (
            <SortableField
              key={field.id}
              field={field}
              selected={selected === field.id}
              onSelect={() => setSelected(field.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}