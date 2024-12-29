import { Button, ButtonProps } from '@mantine/core';
import { IconBrandTwitter } from '@tabler/icons-react';

export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button leftSection={<IconBrandTwitter size={16} color="lightblue" />} variant="default" {...props} />
  );
}