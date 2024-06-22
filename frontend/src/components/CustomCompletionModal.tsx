import { Button, Loader, Modal } from "@mantine/core"
import { DateInput, DateValue } from "@mantine/dates"

type Chore = {
    name: string
}

export type CustomCompletionModalProps = {
    chore: Chore
    completeOn: (date: DateValue) => Promise<void>
    opened: boolean
    close: () => void
    isLoading: boolean
}

const CustomCompletionModal = ({
    chore,
    completeOn,
    opened,
    close,
    isLoading,
}: CustomCompletionModalProps) => {
    let customCompletionDate: DateValue = new Date()

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={`Custom completion for '${chore.name}'`}
            centered
        >
            <DateInput
                // Can't use controlled value here because modal doesn't update with re-renders
                defaultValue={customCompletionDate}
                onChange={(value) => {
                    customCompletionDate = value
                }}
                mb={"350px"}
                label="Complete on"
                data-autofocus
            />

            <Button
                fullWidth
                onClick={() => {
                    console.log(customCompletionDate)
                    completeOn(customCompletionDate)
                }}
                variant="gradient"
                gradient={{
                    from: "green",
                    to: "teal",
                    deg: 60,
                }}
            >
                {isLoading ? (
                    <Loader color="white" size="xs" />
                ) : (
                    "Complete on selected date"
                )}
            </Button>
        </Modal>
    )
}

export default CustomCompletionModal
