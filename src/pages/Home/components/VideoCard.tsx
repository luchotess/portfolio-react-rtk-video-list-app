import { useDispatch } from 'react-redux'

import { Anchor, Badge, Button, Card, Group, Image, Text } from '@mantine/core'

import { add, remove } from '../../../resources/videoList/videosListSlice.ts'

interface VideoCardProps {
  image: string
  title: string
  description: string
  etag: string
  added: boolean
}

export default function VideoCard({ image, title, description, etag, added }: VideoCardProps) {
  const dispatch = useDispatch()

  const onAddVideo = () => {
    dispatch(
      add({
        image,
        title,
        description,
        id: etag,
      })
    )
  }

  const onRemoveVideo = () => {
    dispatch(remove(etag))
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={160} alt={title} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        {added && (
          <Badge color="pink" variant="light">
            Added to your list
          </Badge>
        )}
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Anchor target="_blank" href={`https://www.youtube.com/watch?v=${etag}`}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Watch video
        </Button>
      </Anchor>

      <Button
        variant="light"
        color={added ? 'red' : 'green'}
        fullWidth
        mt="md"
        radius="md"
        onClick={added ? onRemoveVideo : onAddVideo}
      >
        {added ? 'Remove from List' : 'Add to my List'}
      </Button>
    </Card>
  )
}
