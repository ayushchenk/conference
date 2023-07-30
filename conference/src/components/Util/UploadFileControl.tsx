import { UploadFile } from "@mui/icons-material";
import { FormControl, Box, FormHelperText, IconButton, Button } from "@mui/material";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import ClearIcon from '@mui/icons-material/Clear';

export type UploadFileControlProps<T> = {
  formik: FormikProps<T>,
  field: keyof T,
  label: string,
  mimeType?: string
}

export const UploadFileControl = <T,>({ formik, field, label, mimeType }: UploadFileControlProps<T>) => {
  return (
    <FormControl fullWidth error={formik.touched[field] && Boolean(formik.errors[field])}>
      <Box sx={{ display: "flex", mt: 2 }}>
        {formik.values[field] &&
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormHelperText>{(formik.values[field] as File)?.name}</FormHelperText>
            <IconButton onClick={() => { formik.setFieldValue(field.toString(), undefined) }}>
              <ClearIcon />
            </IconButton>
          </Box>
        }
        <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
          {label}
          <input
            id={field.toString()}
            name={field.toString()}
            accept={mimeType ?? "*"}
            type="file"
            hidden
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                formik.setFieldValue(field.toString(), event.target.files[0]);
              }
            }}
          />
        </Button>
      </Box>
      {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]?.toString()}</FormHelperText>}
    </FormControl>
  );
}