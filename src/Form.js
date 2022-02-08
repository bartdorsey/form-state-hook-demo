import useFormState from "./useFormState.js"

export default function Form() {
  console.log("Rendered")
  const {
    inputProps: { firstName, lastName },
    formProps,
    reset,
  } = useFormState(
    {
      firstName: "",
      lastName: "",
    },
    (state) => {
      console.log(state)
    }
  )

  return (
    <form {...formProps}>
      <input type="text" {...firstName} />
      <input type="text" {...lastName} />
      <button onClick={reset}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  )
}
