import type {NextPage} from 'next'
import Layout from "../components/Layout";
import {Badge, Card, Grid, Image, Title} from "@mantine/core";
import Link from 'next/link';

const Home: NextPage = () => {
    const posts = [
        {
            date: "2022-08-09",
            path: "dynamic-blog-posts-with-mdx",
            title: "Dynamic blog posts with MDX",
            tags: ["mdx", "react"],
            preview: "Bite-Sized Serverless is a collection of articles about AWS Serverless technologies, use cases, implementation details and insights. In this article you will find details about the platform, the FAQ and general info about Bite-Sized Serverless' vision, goals and scope.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
        },
    ]

    return (
        <Grid>
            {posts.map((post, index) =>
                <Link href={`/${post.path}`} passHref key={index}>
                    <Grid.Col xs={6} sm={4} mt="xl">
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={post.image}
                                    height={160}
                                    fit="contain"
                                    alt="Norway"
                                />
                            </Card.Section>
                            <Title order={3} py="md">{post.title}</Title>
                            {post.preview}
                            <div>
                                {post.tags.map((tag, index) => (
                                    <Badge mt="xs" ml="xs" key={index}>{tag}</Badge>
                                ))}
                            </div>

                        </Card>
                    </Grid.Col>
                </Link>
            )}
        </Grid>
    )
}

const Home2 = () => (<Layout><Home/></Layout>)

export default Home2
