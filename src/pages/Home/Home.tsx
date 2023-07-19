import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Button, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { LocalVideo } from '../../resources/videoList/videosListSlice.ts'
import { useGetVideosQuery } from '../../services/YTVIdeos.ts'
import { RootState } from '../../store.ts'

import VideoCard from './components/VideoCard.tsx'

const initialValues = {
  search: '',
}

export const isVideoAdded = (id: string, localVideos: { [key: string]: LocalVideo }) =>
  !!localVideos[id]

export default function Home() {
  const [searchText, setSearchText] = useState('')
  const { data: videos, isLoading } = useGetVideosQuery(searchText)
  const videoList = useSelector((state: RootState) => state.videoList.value)
  const [showVideoList, setShowVideoList] = useState(false)
  const videoListKeys = Object.keys(videoList)

  const form = useForm({
    initialValues,
    validate: {
      search: (value: string) => (value.length < 3 ? '3 or more characters' : null),
    },
  })

  const onSubmit = ({ search }: typeof initialValues) => {
    setSearchText(search)
  }

  const showVideoListToggle = () => {
    setShowVideoList(!showVideoList)
  }

  return (
    <>
      <Stack sx={{ maxWidth: '1000px', margin: 'auto' }}>
        <Box mb="lg">
          <Group align="end" position="apart">
            <Text size="xl" weight="800" mb="sm">
              Youtube Videos
            </Text>
            <Button type="button" color="green" onClick={showVideoListToggle}>
              {showVideoList ? 'Search new videos' : 'See my videos'}
            </Button>
          </Group>
          {!showVideoList && (
            <form onSubmit={form.onSubmit(onSubmit)}>
              <Group position="left" mt="md" align="end">
                <TextInput
                  withAsterisk
                  label="Search videos"
                  placeholder="Pokemon..."
                  {...form.getInputProps('search')}
                />

                <Button type="submit">Search</Button>
              </Group>
            </form>
          )}
        </Box>
        {!showVideoList ? (
          <Box>
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <SimpleGrid cols={3}>
                {videos?.map(({ snippet, id }, key) => (
                  <VideoCard
                    key={`video-${key}`}
                    title={snippet.title}
                    etag={id.videoId}
                    description={snippet.description}
                    image={snippet.thumbnails.high.url}
                    added={isVideoAdded(id.videoId, videoList)}
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>
        ) : (
          <Box>
            {videoListKeys.length ? (
              <SimpleGrid cols={3}>
                {videoListKeys?.map((id, key) => (
                  <VideoCard
                    key={`localvideo-${key}`}
                    title={videoList[id].title}
                    etag={id}
                    description={videoList[id].description}
                    image={videoList[id].image}
                    added={isVideoAdded(id, videoList)}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text>You don&apos;t have any videos added to your list yet.</Text>
            )}
          </Box>
        )}
      </Stack>
    </>
  )
}
