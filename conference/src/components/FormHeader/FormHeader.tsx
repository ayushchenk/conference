import { Typography } from "@mui/material"
import { PropsWithChildren } from "react"

export const FormHeader = ({ children }: PropsWithChildren) => {
  return <Typography variant="h5" marginTop={2} marginBottom={2}>{children}</Typography>
}