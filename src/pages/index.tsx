import { Capacitor } from "@capacitor/core"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Button, Container, Grid, Stack, Text, Title } from "@mantine/core"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { LoadingPage } from "~/components/LoadingSpinner"

export default function LandingPage() {
    const router = useRouter()
    const { isLoaded: userLoaded, isSignedIn } = useUser()

    // TODOdin
    // if (Capacitor.isNativePlatform() && isSignedIn) {
    //     router.push("/chores")
    // }

    // if (!userLoaded) return <LoadingPage />

    return (
        <>
            <Head>
                <title>Home Owl</title>
                <meta
                    name="description"
                    content="Keep a watchful eye on your chores!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                        <Image
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
                                                response.statusText
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
                                        error
                                    )
                                })
                        }}
                    >
                        Get My Home
                    </Button>

                    <Grid>
                        <Grid.Col sm={5} xs={12}>
                            <Stack h={"100%"} justify="center">
                                <Title order={2}>
                                    Home Owl ensures a fair distribution of
                                    labour in your household!
                                </Title>
                                <Text color="grey">
                                    Create tasks and recurring chores in the
                                    Home Owl app, collect points by completing
                                    them and keep an eye on everyone's score
                                    being equal!
                                </Text>
                                <div>
                                    {isSignedIn ? (
                                        <Button
                                            variant="outline"
                                            color="teal"
                                            onClick={() =>
                                                router.push("/chores")
                                            }
                                        >
                                            Go to Home Owl
                                        </Button>
                                    ) : (
                                        <SignInButton redirectUrl="/home">
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
                        <Grid.Col sm={6} xs={12} offsetXs={0} offsetSm={1}>
                            <Image
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
