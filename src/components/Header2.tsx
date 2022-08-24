import {Badge, Card, Container, Grid, Image, Select} from '@mantine/core';
import {useForm} from '@mantine/form';
import _ from "lodash";

type Pokemon = {
    name: string;
    category: string;
    height: number;
    weight: number;
    imgUrl: string;
    abilities: string[];
    types: ("grass" | "poison" | "electric" | "normal")[];
}

const typeColors = {
    grass: "teal",
    poison: "grape",
    electric: "yellow",
    normal: "gray"
}

const pokemon: { [key: string]: Pokemon; } = {
    bulbasaur: {
        name: "bulbasaur",
        category: "Seed Pokémon",
        height: 7,
        weight: 69,
        abilities: ["overgrow", "chlorophyll"],
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        types: ["grass", "poison"],
    },
    pikachu: {
        name: "pikachu",
        category: "Mouse Pokémon",
        height: 4,
        weight: 60,
        types: ["electric"],
        abilities: ["static", "lighting-rod"],
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    ditto: {
        name: "ditto",
        category: "Transform Pokémon",
        height: 3,
        weight: 40,
        abilities: ["imposter"],
        types: ["normal"],
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
    }
}

export function Header2() {
    const bold = {fontWeight: "bold"}

    const form = useForm<{ pokemon: "pikachu" | "bulbasaur" }>({
        initialValues: {
            pokemon: "pikachu",
        },
    });

    const selectedPokemon = pokemon[form.values.pokemon];
    const types = selectedPokemon.types.map(t => (<Badge key={t} mt="md" color={typeColors[t]}>{t}</Badge>))

    return (
        <>
            <Container size={"xs"}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Select
                        label="Your favorite Pokemon"
                        data={Object.keys(pokemon).map(p => ({value: p, label: _.capitalize(p)}))}

                        {...form.getInputProps('pokemon')}
                    />
                    <Image
                        radius="md"
                        src={selectedPokemon.imgUrl}
                        alt="Random unsplash image"
                        height={200}
                        width={200}
                    />
                    <Grid>
                        <Grid.Col span={4} sx={{fontWeight: "bold"}}>Height</Grid.Col>
                        <Grid.Col span={4}>{selectedPokemon.height}</Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={4} sx={{fontWeight: "bold"}}>Weight</Grid.Col>
                        <Grid.Col span={4}>{selectedPokemon.weight}</Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={4} sx={{fontWeight: "bold"}}>Abilities</Grid.Col>
                        <Grid.Col
                            span={4}>{selectedPokemon.abilities.map(a => _.capitalize(a)).join(", ")}</Grid.Col>
                    </Grid>
                    <Grid>{types}</Grid>
                </Card>
            </Container>
        </>
        // <div onClick={() => setCounter((s) => s + 1)}>HEJ PÅ DEJ, DU ÄR {counter}</div>
    );
};
