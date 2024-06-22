import { SignInButton, useUser } from "@clerk/clerk-react"
import { Button, Container, Grid, Stack, Text, Title } from "@mantine/core"
import { Helmet } from "react-helmet"
import { Link, createFileRoute } from "@tanstack/react-router"
import { LoadingPage } from "~/components/LoadingSpinner"

export const Route: any = createFileRoute("/landing")({
    component: LandingPage,
})

function LandingPage() {
    const { isLoaded: userLoaded, isSignedIn } = useUser()

    if (!userLoaded) return <LoadingPage />

    return (
        <>
            <Helmet>
                <title>Home Owl</title>
                <meta
                    name="description"
                    content="Keep a watchful eye on your chores!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>
            <Container>
                <div className="border-b border-slate-400 pb-10">
                    <Title
                        size={"3rem"}
                        className="m-10 ml-0"
                        style={{
                            fontFamily: "Oleo Script",
                            color: "#2b2b2b",
                            textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            style={{ marginTop: "-8px" }}
                            src={"/jellyfish.png"}
                            width={40}
                            height={40}
                            alt="jellyfish icon"
                        />{" "}
                        Home Owl
                    </Title>

                    <Button
                        variant="outline"
                        color="green"
                        onClick={() => {
                            fetch("http://localhost:8080/homes/getMyHome", {
                                method: "GET",
                                credentials: "include",
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(
                                            "Network response was not ok " +
                                                response.statusText,
                                        )
                                    }
                                    return response.json()
                                })
                                .then((data) => {
                                    console.log(data)
                                })
                                .catch((error) => {
                                    console.error(
                                        "There has been a problem with your fetch operation:",
                                        error,
                                    )
                                })
                        }}
                    >
                        Get My Home
                    </Button>

                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 5 }}>
                            <Stack h={"100%"} justify="center">
                                <Title order={2}>
                                    Home Owl ensures a fair distribution of
                                    labour in your household!
                                </Title>
                                <Text c="grey">
                                    Create tasks and recurring chores in the
                                    Home Owl app, collect points by completing
                                    them and keep an eye on everyone's score
                                    being equal!
                                </Text>
                                <div>
                                    {isSignedIn ? (
                                        <Link to="/chores">
                                            <Button
                                                variant="outline"
                                                color="teal"
                                            >
                                                Go to Home Owl
                                            </Button>
                                        </Link>
                                    ) : (
                                        // TODO: Check if env var for this works by removing forceRedirectUrl from component
                                        <SignInButton forceRedirectUrl="/home">
                                            <Button
                                                variant="outline"
                                                color="teal"
                                            >
                                                Sign up now!
                                            </Button>
                                        </SignInButton>
                                    )}
                                </div>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, sm: 6 }}
                            offset={{ base: 0, sm: 1 }}
                        >
                            <img
                                src={"/ChoresScreenshot.png"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }} // optional
                                alt="screenshot of chores view"
                            />
                        </Grid.Col>
                    </Grid>
                </div>
            </Container>
        </>
    )
}
