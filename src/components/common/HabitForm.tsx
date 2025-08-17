import { KEYS } from '@/constants/keys';
import { HabitIcons } from '@/constants/styles';
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut';
import { HABIT_STATUSES } from '@/types/habit';
import { getToday } from '@/utils/date';
import { formatHabitStatus } from '@/utils/title';
import {
  Box,
  Button,
  createListCollection,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useRef, useState, type FormEvent } from 'react';

export const HabitForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const initialInputRef = useRef<HTMLInputElement>(null);
  const statusCollection = createListCollection({
    items: HABIT_STATUSES,
    itemToString: (item) => formatHabitStatus(item),
  });

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLFormElement;
    if (!e.currentTarget) return;

    const data = new FormData(target);
    const newHabit = {
      name: data.get('name'),
      startDate: data.get('startDate'),
      statusTillToday: data.get('statusTillToday'),
    };

    console.log('newHabit', newHabit);

    setOpen(false);
  };

  useKeyboardShortcut(KEYS.N, handleDialogOpen);

  return (
    <Box>
      <Dialog.Root
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        initialFocusEl={() => initialInputRef.current}
      >
        <Dialog.Trigger asChild>
          <Button mb={5} onClick={handleDialogOpen}>
            Create a habit
          </Button>
        </Dialog.Trigger>
        <Portal>
          <form onSubmit={handleSubmit}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Create a new habit</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body pb="4">
                  <Stack gap="4">
                    {/* Name */}
                    <Field.Root>
                      <Field.Label>Name</Field.Label>
                      <Input
                        ref={initialInputRef}
                        name="name"
                        placeholder="Name"
                      />
                    </Field.Root>
                    <Field.Root>
                      {/* Start Date */}
                      <Field.Label>Start date</Field.Label>
                      <Input
                        type="date"
                        name="startDate"
                        placeholder="Start date"
                        defaultValue={getToday()}
                      />
                    </Field.Root>
                    {/* Status until today */}
                    <Field.Root>
                      <Field.Label>Status until today</Field.Label>
                      <Select.Root
                        name="statusTillToday"
                        collection={statusCollection}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select a status" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {statusCollection.items.map((status) => {
                              const HabitStatusIcon = HabitIcons[status];

                              return (
                                <Select.Item item={status} key={status}>
                                  <Flex gap={2} align="center">
                                    <HabitStatusIcon />
                                    {formatHabitStatus(status)}
                                  </Flex>
                                  <Select.ItemIndicator />
                                </Select.Item>
                              );
                            })}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                  </Stack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit">Save</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </form>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};
