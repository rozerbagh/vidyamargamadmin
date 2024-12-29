import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Title } from '@mantine/core';
import classes from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title order={6} >Vidyamargam</Title>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;