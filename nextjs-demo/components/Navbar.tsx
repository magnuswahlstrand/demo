import {Container, createStyles, Group, Title} from "@mantine/core";
import {ThreeDCubeSphere} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    header: {
        position: "sticky",
        top: 0,
        padding: 15,
        backgroundColor: theme.colors.gray[1],
        justifyContent: 'space-between',
        borderBottom: `1px solid black`,
        zIndex: 1
    },
    links: {},
}));

const Navbar2 = () => {
    const {classes, cx} = useStyles();

    return (
        <div className={classes.header}>
            <Container>
                <Group className={classes.links} position="center">
                    <ThreeDCubeSphere
                        size={40}
                        strokeWidth={2}
                        color={'black'}
                    />
                    <Title ml={"xl"}>wahlstrand.dev</Title>
                </Group>
            </Container>
        </div>
    )
    // return <Header height={60} className={classes.root}>

    // </Header>
}

export default Navbar2;
